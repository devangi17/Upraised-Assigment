import pandas as pd
import mysql.connector
import sys
df = pd.read_excel('C:/Users/Devangi/Upraised Assisgnment/routes/Current dictionary for skill extraction (1).xlsx', sheet_name=0, header= None)
mylist = df.values.tolist()

output=[]
def reemovNestings(m): 
    for i in m: 
        if type(i) == list: 
            reemovNestings(i) 
        else: 
            output.append(i)

reemovNestings(mylist)

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd="qwertyuiop17=",
  auth_plugin='mysql_native_password',
  database= 'upraised'
)
skill_dict = []

#print(mydb)
cursor = mydb.cursor()
cursor.execute("Select u_description from crawled_jobs where flag_jobs ='1';")
result= cursor.fetchall()


for x in range(len(output)):
	counter= 0
	for y in range(len(result)):
		if(str(output[x]) in str(result[y])):
			counter+=1
	skill_dict.append((str(output[x]),counter))

print(skill_dict)
sys.stdout.flush()
