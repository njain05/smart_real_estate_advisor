# 🤖 AI Integration Setup Guide

## 🚀 Quick Start

### 1. Create Environment File
Create a file called `.env.local` in your project root (same folder as `package.json`) and add:

```bash
GOOGLE_AI_API_KEY=AIzaSyDn0a2tnhmVd-_tUbPRrf6eiFJD4jHLdUY
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The app will run on **http://localhost:9002**

## 🧪 Testing AI Features

1. **Navigate to Dashboard**: Go to `/dashboard` after logging in
2. **Find AI Test Section**: Scroll down to see the "🤖 AI Integration Test" card
3. **Test Legal Tips**: Enter a location (e.g., "Mumbai") and click "Get Legal Tips"
4. **Test Recommendations**: Click "Get AI Recommendations" to test property suggestions

## 🔧 What's Working Now

✅ **AI Functions Created**:
- `getLegalTips()` - Get legal advice for specific locations
- `recommendProperties()` - AI-powered property recommendations

✅ **UI Integration**:
- AI test component added to dashboard
- Error handling and loading states
- Beautiful UI with Tailwind CSS

## 🚨 Troubleshooting

### Common Issues:

1. **"Error getting legal tips"**
   - Check if `.env.local` file exists
   - Verify API key is correct
   - Restart development server after creating env file

2. **"Unknown error"**
   - Check browser console for detailed error
   - Ensure Google AI API key has proper permissions

3. **Component not showing**
   - Make sure you're on `/dashboard` page
   - Check if there are any TypeScript errors

## 🎯 Next Steps

Once AI is working, you can:

1. **Integrate AI into Property Cards** - Add legal tips to each property
2. **Create AI Chatbot** - Build conversational property advisor
3. **Add Property Valuation AI** - Estimate property values
4. **Market Analysis** - AI-powered market insights
5. **Document AI** - Extract info from property documents

## 📱 API Usage

Your Google AI API key will be used for:
- Legal tips generation
- Property recommendations
- Future AI features

**Note**: Keep your API key secure and don't commit it to version control!
