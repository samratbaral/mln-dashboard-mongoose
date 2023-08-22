from calculate import calculate_it
from flask import Flask, request, render_template
import json
from flask import jsonify
from flask import redirect
import os

app = Flask(__name__)


@app.route('/')
def my_form():
    return render_template('from_ex.html')


@app.route('/ab', methods=['POST', 'GET'])
def my_form_post():
    # ...
    # print(request.form['a'])
    a = request.form['a']
    A = int(a)


    result = calculate_it(A)
    return 'the result is %s' % result
    # return redirect("http://localhost:3000/user-directory", code=302)
    # return json.dumps(result)
    
    


if __name__ == "__main__":
    # app.run()
    app.run(port=5000, debug=True)










# # #import packages
# # # handle root route
# from email.quoprimime import quote
# from flask import Flask
# import os
# import subprocess
# import json
# from flask import render_template_string
# from flask import render_template
# from flask import jsonify
# from flask import request
# from flask import redirect
# from flask import session, url_for

# app = Flask(__name__)


# # @app.route('/flask/<content>', methods=['GET'])
# @app.route('/flask', methods=['GET'])
# # def flask(content):
# def flask():
#     # file_content = json.dumps(content)
#     cwd = {
#         "DIRECTORY": os.getcwd(),
#         "FILES": subprocess.check_output('ls', shell=True).decode('utf-8').split('\n')
#         , "CONTENT": "Data Goes Here"
#     }
#     return json.dumps(cwd)


# @app.route('/cd')
# def cd():

#     # run 'level_up' commands
#     os.chdir(request.args.get('path'))
#     # y = os.getcwd()
#     return redirect('http://localhost:3000/viewfile')


# @app.route('/view')
# def view():
#     print(request.args.get("file"))
#     x = subprocess.check_output(
#         'cat '+request.args.get('file'), shell=True).decode('utf-8').replace('\n', '<br>')
#     # return redirect(url_for("flask", content=x))
#     return json.dumps(x)
#     # return redirect('http://localhost:3000/viewfile')


# if __name__ == "__main__":
#     app.run(port=5000, debug=True)

# # @app.route('/view')
# # def view():
# #     x = subprocess.check_output(
# #         'cat '+request.args.get('file'), shell=True).decode('utf-8').replace('\n','<br>')
# #     return render_template('home.html', current_working_directory=os.getcwd(),
# #                            file_list=subprocess.check_output('ls', shell=True).decode('utf-8').split('\n'), file_output=x)
