from extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import Date 

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    is_oauth = db.Column(db.Boolean, default=False)
    
    # Identity
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    
    name = db.Column(db.String(100), nullable=True) 
    
    birthdate = db.Column(db.Date, nullable=True) 
    
    # Social Login Fields
    google_id = db.Column(db.String(255), unique=True, nullable=True)
    apple_id = db.Column(db.String(255), unique=True, nullable=True)
    
    # Security Fields
    password_hash = db.Column(db.String(128), nullable=True)
    phone_number = db.Column(db.String(20), nullable=True)

    def set_password(self, password):
        """Hashes the password using Werkzeug's security functions."""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """Checks the plain password against the stored hash."""
        # Check if a hash exists before attempting to compare
        if self.password_hash is None:
            return False 
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.username}>'