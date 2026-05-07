from flask import Flask, jsonify
from flask_cors import CORS
from database import db
from routes.service_routes import service_bp
from routes.booking_routes import booking_bp
from routes.admin_routes import admin_bp


def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///deepclean.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = "deep-clean-wash-production-secret-2026"

    CORS(app)

    db.init_app(app)

    app.register_blueprint(service_bp, url_prefix="/api")
    app.register_blueprint(booking_bp, url_prefix="/api")
    app.register_blueprint(admin_bp, url_prefix="/api")

    @app.route("/")
    def home():
        return jsonify({
            "message": "Deep Clean & Wash API is running"
        })

    with app.app_context():
        db.create_all()

    return app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True)