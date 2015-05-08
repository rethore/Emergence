# -*- coding: utf-8 -*-

import os

from flask import Flask, request, render_template, flash
from wtforms.widgets import TextArea
from flask_bootstrap import Bootstrap
from flask_appconfig import AppConfig
from flask_wtf import Form, RecaptchaField
from flask.ext.mail import Message, Mail
from wtforms import TextField, HiddenField, ValidationError, RadioField,\
    BooleanField, SubmitField, IntegerField, FormField, validators, PasswordField, TextAreaField
from wtforms.validators import Required
import yaml 



## Load the data to be injected in the templates
with open('content.yml', 'r') as f:
    data = yaml.load(f.read())

## Processing the content to prepare for the landing page
metadic = { # Contains the relevant font for each meta team info
    'github': 'fa-github-square',
    'email': 'fa-envelope-square',
    'linkedin': 'fa-linkedin-square'}

for m in data['members']:
    m['meta'] = [{'address':v, 'font': metadic[k]} for k,v in m.iteritems() if k in metadic]


class ContactForm(Form):
  name = TextField("Name",  [validators.Required()])
  email = TextField("Email",  [validators.Required(), validators.Email()])
  subject = TextField("Subject",  [validators.Required()])
  message = TextAreaField("Message",  [validators.Required()])
  submit = SubmitField("Send")


app = Flask(__name__)
configfile=None
AppConfig(app, configfile)  # Flask-Appconfig is not necessary, but
                            # highly recommend =)
                            # https://github.com/mbr/flask-appconfig

mail = Mail()

app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 465
app.config["MAIL_USE_SSL"] = True
app.config["MAIL_USERNAME"] = 'fractalflows@gmail.com'
app.config["MAIL_PASSWORD"] = 'emergence'
mail.init_app(app)                            

Bootstrap(app)
# in a real app, these should be configured through Flask-Appconfig
app.config['SECRET_KEY'] = 'devkey'

@app.route('/contact')
def contact():
  form = ContactForm()
  return render_template('contact.html', form=form)

@app.route('/')
def hello():
    provider = str(os.environ.get('PROVIDER', 'world'))
    return render_template('base.html', form={'hello':'world'})

import re
 
from jinja2 import evalcontextfilter, Markup, escape
    
@app.template_filter()
@evalcontextfilter
def linebreaks(eval_ctx, value):
    """Converts newlines into <p> and <br />s."""
    value = re.sub(r'\r\n|\r|\n', '\n', value) # normalize newlines
    paras = re.split('\n{2,}', value)
    paras = [u'<p>%s</p>' % p.replace('\n', '<br />') for p in paras]
    paras = u'\n\n'.join(paras)
    return Markup(paras)
 
@app.template_filter()
@evalcontextfilter
def linebreaksbr(eval_ctx, value):
    """Converts newlines into <p> and <br />s."""
    value = re.sub(r'\r\n|\r|\n', '\n', value) # normalize newlines
    paras = re.split('\n{2,}', value)
    paras = [u'%s' % p.replace('\n', '<br />') for p in paras]
    paras = u'\n\n'.join(paras)
    return Markup(paras)

@app.route('/landing', methods=['GET', 'POST'])
def landing():
    form = ContactForm()
    if request.method == 'POST':
        if form.validate() == False:
            flash('All fields are required.')
            return render_template('landing.html', form=form, data=data)
        else:
            msg = Message(form.subject.data, 
                          sender='fractalflows@gmail.com', 
                          recipients=['rethore@fractalflows.com'])
            msg.body = """
            From: %s <%s>
            %s
            """ % (form.name.data, form.email.data, form.message.data)
            mail.send(msg)            
            return render_template('landing.html', form=form, data=data, success=True)

    return render_template('landing.html', form=form, data=data)


if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)