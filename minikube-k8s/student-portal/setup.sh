#!/bin/bash

echo "🎓 Student Registration Portal - Setup Script"
echo "=============================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Installation complete!"
    echo ""
    echo "🚀 To start the application, run:"
    echo "   npm start"
    echo ""
    echo "📝 Or for development mode with auto-restart:"
    echo "   npm run dev"
    echo ""
    echo "🌐 The application will be available at:"
    echo "   http://localhost:3000"
    echo ""
else
    echo ""
    echo "❌ Installation failed. Please check the errors above."
    exit 1
fi
