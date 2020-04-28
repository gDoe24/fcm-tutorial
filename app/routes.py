from app import app
from flask import render_template, flash, redirect, url_for, request, jsonify
import firebase_admin
from firebase_admin import credentials
from pyfcm import FCMNotification


@app.route('/')
@app.route('/index')
def index():

	return render_template('index.html', title='Home')

