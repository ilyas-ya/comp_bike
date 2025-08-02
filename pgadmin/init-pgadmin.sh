#!/bin/bash
# pgAdmin initialization script

# Wait for pgAdmin to start
sleep 10

# Copy server configuration
cp /pgadmin4/servers.json /var/lib/pgadmin/servers.json

# Set proper permissions
chown pgadmin:pgadmin /var/lib/pgadmin/servers.json
chmod 600 /var/lib/pgadmin/servers.json

echo "pgAdmin configuration completed!"
