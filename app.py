import os
from flask import Flask, render_template, request, redirect, url_for
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')  # Use a non-GUI backend for rendering

import seaborn as sns
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)

# Define paths
UPLOAD_FOLDER = r"C:\Users\Gites\OneDrive\Documents\New folder\java programs\my_dropout_analysis\uploads"
STATIC_FOLDER = r"C:\Users\Gites\OneDrive\Documents\New folder\java programs\my_dropout_analysis\static"
TEMPLATES_FOLDER = r"C:\Users\Gites\OneDrive\Documents\New folder\java programs\studentdropoutUI\templates"

# Set Flask configuration
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['STATIC_FOLDER'] = STATIC_FOLDER

# Function to load data
def load_data(filepath):
    try:
        data = pd.read_csv(filepath)
        if data.isnull().sum().any():
            print("Warning: Missing values detected. Filling with mean values.")
            data.fillna(data.mean(), inplace=True)
        return data
    except FileNotFoundError:
        print(f"Error: The file at {filepath} was not found.")
        return None

# Standardize features
def standardize_features(data, feature_columns):
    scaler = StandardScaler()
    features_scaled = scaler.fit_transform(data[feature_columns])
    return features_scaled, scaler

# Apply KMeans
def apply_kmeans(features_scaled, n_clusters=2, random_state=42):
    kmeans = KMeans(n_clusters=n_clusters, random_state=random_state)
    kmeans.fit(features_scaled)
    return kmeans

# Visualize cluster centers
def visualize_cluster_centers(kmeans, scaler, feature_columns):
    cluster_centers = scaler.inverse_transform(kmeans.cluster_centers_)
    cluster_df = pd.DataFrame(cluster_centers, columns=feature_columns)

    plt.figure()
    cluster_df.plot(kind='bar')
    plt.title('Cluster Centers (Dropout Risk)')
    plt.ylabel('Average Assessment Scores')
    plt.xticks([0,1], ['Cluster 0', 'Cluster 1'], rotation=0)
    plt.tight_layout()
    
    # Save the plot to the static folder
    plt.savefig(os.path.join(app.config['STATIC_FOLDER'], 'cluster_centers.png'))
    plt.close()

# Analyze clusters and generate plots
def analyze_clusters(data):
    # Count plot for dropout risk distribution
    plt.figure()
    sns.countplot(x='Dropout Risk', data=data)
    plt.title('Dropout Risk Distribution')
    plt.tight_layout()
    
    # Save the plot to the static folder
    plt.savefig(os.path.join(app.config['STATIC_FOLDER'], 'dropout_risk_distribution.png'))
    plt.close()

    # Line plot for assessments over time
    plt.figure()
    plt.plot(data['Assignments'], label='Assignments', marker='o')
    plt.plot(data['Audio Assessment'], label='Audio Assessment', marker='o')
    plt.plot(data['Video Assessment'], label='Video Assessment', marker='o')
    plt.plot(data['Text Assessment'], label='Text Assessment', marker='o')
    
    plt.title('Assessment Scores Line Plot')
    plt.xlabel('Students (or Time)')
    plt.ylabel('Scores')
    plt.legend()
    plt.tight_layout()

    # Save the plot to the static folder
    plt.savefig(os.path.join(app.config['STATIC_FOLDER'], 'assessment_line_plot.png'))
    plt.close()

# Route to render file upload page
@app.route('/')
def upload_file():
    return render_template('upload.html')

# Route to handle file upload and display results
@app.route('/', methods=['POST'])
def upload_file_post():
    if 'file' not in request.files:
        return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        return redirect(request.url)
    
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(filepath)
    
    data = load_data(filepath)
    if data is None:
        return "Error loading data"

    feature_columns = ['Audio Assessment', 'Video Assessment', 'Text Assessment', 'Assignments']
    features_scaled, scaler = standardize_features(data, feature_columns)
    kmeans = apply_kmeans(features_scaled)
    data['Dropout Risk'] = kmeans.labels_
    data['Dropout Risk'] = data['Dropout Risk'].map({1: 'Yes', 0: 'No'})
    visualize_cluster_centers(kmeans, scaler, feature_columns)
    analyze_clusters(data)

    at_risk_students = data[data['Dropout Risk'] == 'Yes']
    print(f"Number of students at risk: {len(at_risk_students)}")

    output_filename = os.path.join(app.config['UPLOAD_FOLDER'], 'dropout_risk_results.csv')
    data.to_csv(output_filename, index=False)

    # Read the generated CSV and convert it to an HTML table
    csv_data = pd.read_csv(output_filename)
    csv_table = csv_data.to_html(classes='table table-striped', index=False)
    
    return render_template('results.html', 
                           at_risk_count=len(at_risk_students), 
                           dropout_risk_dist_img='static/dropout_risk_distribution.png',
                           assessment_line_plot_img='static/assessment_line_plot.png',
                           csv_table=csv_table)

if __name__ == "__main__":
    app.run(debug=True)
