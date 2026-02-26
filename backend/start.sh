#!/bin/bash

# Export DATABASE_URL to make it available to Apache/PHP
export DATABASE_URL="${DATABASE_URL}"

# Start Apache in foreground
apache2-ctl -D FOREGROUND
