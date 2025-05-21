#!/bin/bash

# Create applications directory
mkdir -p /var/www/darkcarnival
cd /var/www/darkcarnival

# Clone repositories
echo "Cloning Dark Carnival applications..."
git clone https://github.com/your-org/arcana-obscura.git
git clone https://github.com/your-org/other-carnival-apps.git

# Set up environment variables
echo "Setting up environment variables..."
cat > .env << EOL
VITE_DARK_CARNIVAL_API_URL=http://api.darkcarnival.com
VITE_DARK_CARNIVAL_API_KEY=your_api_key_here
EOL

# Copy .env to each application directory
for d in */ ; do
  cp .env "$d"
done

# Install dependencies and build applications
echo "Installing dependencies and building applications..."
for d in */ ; do
  cd "$d"
  npm install
  npm run build
  cd ..
done

echo "Setup complete! Dark Carnival applications are ready."