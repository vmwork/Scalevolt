# Use an official lightweight Python image
FROM python:3.9-slim

# Create a working directory inside the container
WORKDIR /app

# Copy requirements.txt first to leverage Docker's cache
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy all other files into the container
COPY . .

# Expose the port that FastAPI/uvicorn will run on
EXPOSE 8000

# Default command to run the app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
