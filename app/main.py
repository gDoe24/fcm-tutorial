import firebase_admin
from firebase_admin import credentials
from pyfcm import FCMNotification

cred = credentials.Certificate("./ServiceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
push_service = FCMNotification(api_key="AIzaSyDGWA59LE7GEoohGxvGw-Pf0OoZhVkAIj8")

doc_ref = db.collection(u'sampleData').document(u'inspiration')
doc_ref.set({
	'Title': "Something Title",
	'Message': "Something Message"
	})
print('success')