# pgAdmin Configuration

## Access to pgAdmin

1. Open your browser and go to: `http://localhost:8080`
2. Log in with:
   - **Email**: `admin@admin.com`
   - **Password**: `admin`

## Database Connection

Once logged into pgAdmin, you should automatically see the "Compatibility System DB" server in the server list.

If not, you can manually add the connection:

1. Right-click on "Servers" in the left panel
2. Choose "Register" > "Server..."
3. In the "General" tab:
   - **Name**: `Compatibility System DB`
4. In the "Connection" tab:
   - **Host name/address**: `db` (or `localhost` if it doesn't work)
   - **Port**: `5432`
   - **Maintenance database**: `compatibility_system`
   - **Username**: `postgres`
   - **Password**: `postgres`
5. Click "Save"

## Available Database

- **Name**: `compatibility_system`
- **Tables**: You should see all Django tables after running migrations

## Troubleshooting

If you don't see the `compatibility_system` database:

1. Check that all Docker containers are running:

   ```bash
   docker-compose -f docker-compose.dev.yml ps
   ```

2. Check database logs:

   ```bash
   docker-compose -f docker-compose.dev.yml logs db
   ```

3. Restart pgAdmin:
   ```bash
   docker-compose -f docker-compose.dev.yml restart pgadmin
   ```
