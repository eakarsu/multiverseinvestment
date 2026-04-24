#!/bin/bash

# ============================================================
# Multiverse Consulting Platform - Startup Script
# ============================================================

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Project root directory
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

# -----------------------------------------------------------
# ASCII Banner
# -----------------------------------------------------------
echo -e "${CYAN}${BOLD}"
echo "  ╔══════════════════════════════════════════════════════╗"
echo "  ║                                                      ║"
echo "  ║   ███╗   ███╗██╗   ██╗██╗  ████████╗██╗             ║"
echo "  ║   ████╗ ████║██║   ██║██║  ╚══██╔══╝██║             ║"
echo "  ║   ██╔████╔██║██║   ██║██║     ██║   ██║             ║"
echo "  ║   ██║╚██╔╝██║██║   ██║██║     ██║   ██║             ║"
echo "  ║   ██║ ╚═╝ ██║╚██████╔╝███████╗██║   ██║             ║"
echo "  ║   ╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═╝   ╚═╝             ║"
echo "  ║                                                      ║"
echo "  ║        MULTIVERSE CONSULTING PLATFORM                ║"
echo "  ║                                                      ║"
echo "  ╚══════════════════════════════════════════════════════╝"
echo -e "${NC}"

# -----------------------------------------------------------
# Helper functions
# -----------------------------------------------------------
info()    { echo -e "${CYAN}[INFO]${NC}    $1"; }
success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
warn()    { echo -e "${YELLOW}[WARN]${NC}    $1"; }
error()   { echo -e "${RED}[ERROR]${NC}   $1"; }

# -----------------------------------------------------------
# Step 1: Clean up ports 3000 and 3001
# -----------------------------------------------------------
echo ""
info "Cleaning up ports..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
lsof -ti:3001 | xargs kill -9 2>/dev/null || true
success "Ports 3000 and 3001 cleared."

# -----------------------------------------------------------
# Step 2: Load environment variables
# -----------------------------------------------------------
if [ -f "$PROJECT_DIR/.env" ]; then
    set -a
    source "$PROJECT_DIR/.env"
    set +a
    success "Environment variables loaded from .env"
else
    error ".env file not found at $PROJECT_DIR/.env"
    exit 1
fi

# -----------------------------------------------------------
# Step 3: Check PostgreSQL
# -----------------------------------------------------------
info "Checking PostgreSQL status..."
if pg_isready -q 2>/dev/null; then
    success "PostgreSQL is running."
else
    warn "PostgreSQL is not running. Attempting to start..."
    if command -v brew &>/dev/null; then
        brew services start postgresql@14 2>/dev/null || \
        brew services start postgresql@15 2>/dev/null || \
        brew services start postgresql@16 2>/dev/null || \
        brew services start postgresql 2>/dev/null || true
    elif command -v pg_ctl &>/dev/null; then
        pg_ctl -D /usr/local/var/postgres start 2>/dev/null || true
    fi

    sleep 2

    if pg_isready -q 2>/dev/null; then
        success "PostgreSQL started successfully."
    else
        error "Could not start PostgreSQL. Please start it manually."
        exit 1
    fi
fi

# -----------------------------------------------------------
# Step 4: Create database if it doesn't exist
# -----------------------------------------------------------
info "Ensuring database '${DB_NAME}' exists..."
createdb "$DB_NAME" 2>/dev/null && success "Database '$DB_NAME' created." || warn "Database '$DB_NAME' already exists."

# -----------------------------------------------------------
# Step 5: Install backend dependencies
# -----------------------------------------------------------
info "Installing backend dependencies..."
cd "$PROJECT_DIR/backend" || { error "Backend directory not found!"; exit 1; }
npm install
if [ $? -eq 0 ]; then
    success "Backend dependencies installed."
else
    error "Failed to install backend dependencies."
    exit 1
fi

# -----------------------------------------------------------
# Step 6: Run seed script
# -----------------------------------------------------------
info "Running database seed script..."
node seed.js
if [ $? -eq 0 ]; then
    success "Database seeded successfully."
else
    warn "Seed script encountered issues (may be non-critical)."
fi

# -----------------------------------------------------------
# Step 7: Install frontend dependencies
# -----------------------------------------------------------
info "Installing frontend dependencies..."
cd "$PROJECT_DIR/frontend" || { error "Frontend directory not found!"; exit 1; }
npm install
if [ $? -eq 0 ]; then
    success "Frontend dependencies installed."
else
    error "Failed to install frontend dependencies."
    exit 1
fi

# -----------------------------------------------------------
# Step 8: Start backend with nodemon
# -----------------------------------------------------------
info "Starting backend server with nodemon..."
cd "$PROJECT_DIR/backend" && npx nodemon server.js &
BACKEND_PID=$!

# -----------------------------------------------------------
# Step 9: Start frontend with Vite
# -----------------------------------------------------------
info "Starting frontend dev server..."
cd "$PROJECT_DIR/frontend" && npm run dev &
FRONTEND_PID=$!

# -----------------------------------------------------------
# Step 10: Trap for cleanup on exit
# -----------------------------------------------------------
trap "echo ''; warn 'Shutting down...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; success 'All processes stopped.'; exit" SIGINT SIGTERM EXIT

# -----------------------------------------------------------
# Step 11: Status summary
# -----------------------------------------------------------
sleep 3
echo ""
echo -e "${CYAN}${BOLD}══════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}${BOLD}  Backend  running on  http://localhost:3001${NC}"
echo -e "${GREEN}${BOLD}  Frontend running on  http://localhost:3000${NC}"
echo -e "${CYAN}${BOLD}══════════════════════════════════════════════════════${NC}"
echo ""
info "Press Ctrl+C to stop all services."
echo ""

# -----------------------------------------------------------
# Wait for both processes
# -----------------------------------------------------------
wait $BACKEND_PID $FRONTEND_PID
