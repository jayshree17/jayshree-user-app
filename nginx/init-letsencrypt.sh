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
  -subj "/CN=$DOMAIN" 2>/dev/null

echo "==> Starting nginx with temporary certificate..."
docker compose -f $COMPOSE_FILE up -d nginx

echo "==> Waiting for nginx to be ready..."
sleep 5

echo "==> Removing temporary certificate..."
rm -rf "./certbot/conf/live/$DOMAIN"
rm -rf "./certbot/conf/archive/$DOMAIN"
rm -rf "./certbot/conf/renewal/$DOMAIN.conf"

echo "==> Requesting real Let's Encrypt certificate..."
docker compose -f $COMPOSE_FILE run --rm --entrypoint "certbot" certbot \
  certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email "$EMAIL" \
  --agree-tos \
  --no-eff-email \
  --non-interactive \
  -d "$DOMAIN"

echo "==> Reloading nginx with real certificate..."
docker compose -f $COMPOSE_FILE exec nginx nginx -s reload

echo ""
echo "✅ SSL certificate obtained successfully!"
echo "   Your site is now available at: https://$DOMAIN"
