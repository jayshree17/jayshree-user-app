#!/bin/bash
# init-letsencrypt.sh — Run this ONCE on the EC2 server to obtain SSL certificates
# Usage: sudo bash init-letsencrypt.sh

set -e

DOMAIN="app.jayshree.dev"
EMAIL="jayshree@jayshree.dev"  # Change to your email
COMPOSE_FILE="docker-compose.prod.yml"

echo "==> Creating required directories..."
mkdir -p ./certbot/conf
mkdir -p ./certbot/www

echo "==> Creating temporary self-signed certificate for nginx to start..."
mkdir -p "./certbot/conf/live/$DOMAIN"
openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
  -keyout "./certbot/conf/live/$DOMAIN/privkey.pem" \
  -out "./certbot/conf/live/$DOMAIN/fullchain.pem" \
  -subj "/CN=$DOMAIN"

echo "==> Starting nginx with temporary certificate..."
docker compose -f $COMPOSE_FILE up -d nginx

echo "==> Waiting for nginx to be ready..."
sleep 5

echo "==> Removing temporary certificate..."
rm -rf "./certbot/conf/live/$DOMAIN"

echo "==> Requesting real Let's Encrypt certificate..."
docker compose -f $COMPOSE_FILE run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email "$EMAIL" \
  --agree-tos \
  --no-eff-email \
  -d "$DOMAIN"

echo "==> Reloading nginx with real certificate..."
docker compose -f $COMPOSE_FILE exec nginx nginx -s reload

echo ""
echo "✅ SSL certificate obtained successfully!"
echo "   Your site is now available at: https://$DOMAIN"
echo ""
echo "   Certificate auto-renewal is handled by the certbot container."
