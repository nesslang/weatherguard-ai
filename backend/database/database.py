import os
from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker
import datetime

DATABASE_URL = "sqlite:///./weatherguard.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class Region(Base):
    __tablename__ = "regions"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    lat = Column(Float)
    lng = Column(Float)
    historical_bust_rate = Column(Float)
    typical_error_mm = Column(Float)
    typical_error_temp = Column(Float)
    risk_category = Column(String)

class ForecastData(Base):
    __tablename__ = "forecast_data"
    id = Column(Integer, primary_key=True, index=True)
    region_id = Column(Integer, index=True)
    lead_time = Column(Integer)
    date = Column(String)
    confidence = Column(Float)
    bust_probability = Column(Float)
    expected_error = Column(Float)
    risk_level = Column(String)
    variable = Column(String)

class HistoricalEvent(Base):
    __tablename__ = "historical_events"
    id = Column(Integer, primary_key=True, index=True)
    year = Column(Integer)
    region = Column(String)
    similarity = Column(Float)
    had_bust = Column(Boolean)
    error_magnitude = Column(Float)
    pattern_description = Column(String)

class Prediction(Base):
    __tablename__ = "predictions"
    id = Column(Integer, primary_key=True, index=True)
    region = Column(String)
    lead_time = Column(Integer)
    bust_probability = Column(Float)
    confidence = Column(Float)
    expected_error = Column(Float)
    risk_level = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class ModelMetric(Base):
    __tablename__ = "model_metrics"
    id = Column(Integer, primary_key=True, index=True)
    metric_name = Column(String)
    metric_value = Column(Float)
    lead_time = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
