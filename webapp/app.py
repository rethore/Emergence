import os

from flask import Flask, request, render_template
from wtforms import Form, BooleanField, TextField, PasswordField, validators
from wtforms.widgets import TextArea

class RegistrationForm(Form):
    username = TextField('Username',  [validators.Length(min=4, max=25)], default='pire')
    email = TextField('Email Address', [validators.Length(min=6, max=35)])
    password = PasswordField('New Password', [
        validators.Required(),
        validators.EqualTo('confirm', message='Passwords must match')
    ])
    confirm = PasswordField('Repeat Password')
    longer_text = TextField('Long text', [validators.Length(min=4, max=250)], widget=TextArea())
    accept_tos = BooleanField('I accept the TOS', [validators.Required()])


app = Flask(__name__)

@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm(request.form)
    if request.method == 'POST' and form.validate():
        user = User(form.username.data, form.email.data,
                    form.password.data)
        db_session.add(user)
        flash('Thanks for registering')
        return redirect(url_for('login'))
    return render_template('register.html', form=form)

@app.route('/')
def hello():
    provider = str(os.environ.get('PROVIDER', 'world'))
    return 'Hello '+provider+'!'

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)