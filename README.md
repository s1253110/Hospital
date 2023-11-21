Hospital Information Management System

Group: 43
Members: LIN Jun Shan (12531103)

Application link: https://hosiptal.onrender.com

********************************************
# Login
Through the login interface, each user can access the hospital information management system by entering their username and password.

Each user has a userID and password:
[
	{userid: user1, password: abc123},
	{userid: user2, password: abc123},
	{suerid: user3, password: abc123}
]

After successful login, the userID is stored in the session.

********************************************
# Logout
On the home page, each user can log out of their account by clicking the logout button.

********************************************
# CRUD service
- Create
- A patient document may contain the following attributes with an example:
	1) Patient Name (John Wilson)
	2) Patient ID (00000003), the patient ID must be 8 digits
	3) Gender (Male)
	4) Date of Birth (1991-01-01)
	5) Contact Number (12345678), the contact number must be 8 digits
	6) Address (ABC Street No.789)
	7) Medical Condition (COVID-19)
	8) Allergies (None)

Patient Name and Patient ID are mandatory, and other attributes are optional.

The create operation is a POST request, and all information is in the request body.

********************************************
# CRUD service
- Read
- There are two options to read and find patient information: list all information or search by patient ID.

1) List all information:
   The display.ejs page will show all patient IDs.
   By clicking on a patient ID, the details will be shown.

2) Searching by patient ID:
   Enter the ID of the patient you want to find (e.g., 00000003).
   The ID is sent in the body of a POST request, and in display.ejs, the patient ID will be displayed as a link.
   By clicking on the patient ID, the details will be displayed.

********************************************
# CRUD service
- Update
- The user can update the patient's information through the details interface.
- Among the attributes shown above, the Patient ID cannot be changed. Since the patient ID is fixed, it is used as a search criterion for updating information.

- A patient document may contain the following attributes with an example:
	1) Patient Name (Jones Brown)
	2) Gender (Female)
	3) Date of Birth (1995-02-15)
	4) Contact Number (98765432), the contact number must be 8 digits
	5) Address (XYZ Street No.321)
	6) Medical Condition (Diabetes)
	7) Allergies (Alcohol)

	In the example, we updated the gender, date of birth, contact number, address, medical condition, and allergies of the patient.

********************************************
# CRUD service
- Delete

********************************************
# RESTful API

In this project, there are 4 HTTP request types: GET, POST, PUT, DELETE.

## POST
The POST request is used to insert a new patient record.
Path URL: /api/patients
Test: curl -X POST -H "Content-Type: application/json" --data '{"name": "Jane Smith", "dateOfBirth": "1990-05-20", "gender": "Female", "contactNumber": "76543210", "address": "DEF Street No.567", "medicalCondition": "Diabetes", "allergies": "Peanuts"}' http://localhost:8080/api/patients

## GET
The GET request is used to retrieve patient information.
Path URL: /api/patients/:patientID
Test: curl -X GET http://localhost:8080/api/patients/123456

## PUT
The PUT request is used to update patient information.
Path URL: /api/patients/:patientID
Test: curl -X PUT -H "Content-Type: application/json" --data '{"address": "OPQ Avenue No.432", "contactNumber": "87654321"}' http://localhost:8080/api/patients/123456

## DELETE
The DELETE request is used to delete a patient record.
Path URL: /api/patients/:patientID
Test: curl -X DELETE http://localhost:8080/api/patients/123456

Please note that for all RESTful CRUD services, proper authentication and authorization should be implemented.

To perform the operations, you can use the following curl commands:

Create a new patient record:
curl -X POST -H "Content-Type: application/json" --data '{"name": "Jane Smith", "dateOfBirth": "1990-05-20", "gender": "Female", "contactNumber": "76543210", "address": "DEF Street No.567", "medicalCondition": "Diabetes", "allergies": "Peanuts"}' http://localhost:8080/api/patients

Retrieve patient information:
curl -X GET http://localhost:8080/api/patients/123456

Update patient information:
curl -X PUT -H "Content-Type: application/json" --data '{"address": "OPQ Avenue No.432", "contactNumber": "87654321"}' http://localhost:8080/api/patients/123456

Delete a patient record:
curl -X DELETE http://localhost:8080/api/patients/123456