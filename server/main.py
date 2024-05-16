from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

#app set up // module initialization
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///contacts.db"
cors = CORS(app, origins='*')
db = SQLAlchemy(app)


#BEGIN models
class Contacts(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(150))

#END models


#-------------------UTILS----------------->
#Encapsulate Model data
def createCapsule(contactObj):
    captured = []
    for obj in contactObj:
        captured.append({
        "id": obj.id,
        "first_name": obj.first_name,
        "last_name": obj.last_name,
        "email": obj.email
    })
    
    
    return captured

#Create Message Capsule
def createMessage(m):
    return {"message": m}

#------------------END UTILS---------------->

#BEGIN routes
#
#RETURN ALL USERS
@app.route("/api/get_users", methods=['GET'])
def get_users():
    contacts = Contacts.query.all()
    
    data = createCapsule(contacts)

    return jsonify({"users": data})


#CREATE
@app.route("/api/create_user", methods=(['POST']))
def create_user():
    fetch = request.json
    newContact = Contacts(first_name=fetch.get("first_name"), last_name=fetch.get("last_name"), email=fetch.get("email"))
    try:
        db.session.add(newContact)
    except Exception as e:
        db.session.rollback()
        return createMessage(e)
    finally:
        db.session.commit()

    data = createCapsule([newContact])
    return jsonify(data[0])


#READ
@app.route("/api/get_user/<int:id>", methods=['GET'])
def getUser(id):
    gotem = Contacts.query.get(int(id))
    if not gotem:
        return createMessage("user not found")
    data = createCapsule([gotem])
    return jsonify({"user": data})


#UPDATE
@app.route("/api/update_user/<int:id>", methods=['PATCH'])
def updateUser(id):
    notThis = Contacts.query.get(int(id))
    if not notThis:
        return createMessage("User not found")
    # data = request.json
    # first_name = data.get("first_name", notThis.first_name)
    # last_name = data.get("last_name", notThis.last_name)
    # email = data.get("email", notThis.email)
    # notThis.first_name = first_name
    # notThis.last_name = last_name
    # notThis.email = email
    # db.session.commit()
    
    dataset = createCapsule([notThis])
    return jsonify({"updated": dataset})


#DELETE
@app.route("/api/delete/<int:id>", methods=['DELETE'])
def deleteUser(id):
    choppingBlock = Contacts.query.get(int(id))
    try:
        db.session.delete(choppingBlock)
    except Exception as e:
        return createMessage(e)
        
    finally:
        db.session.commit()
    return createMessage(f"{choppingBlock.first_name} removed from contacts")
    

####
###
##
#END routes

####
###
##
#run application
if __name__ == '__main__':
    with app.app_context().push():
        db.init_app(app)
    app.run(debug=True)