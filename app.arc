@app
plugin-tester

@static
fingerprint true
folder public

@http
get /

@plugins
#oauth2-mock
live-reload

@aws
runtime nodejs14.x
region us-east-1
profile begin-examples