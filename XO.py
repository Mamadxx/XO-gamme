from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler, ContextTypes


BOT_TOKEN = "8920948690:AAFbcHex2RTtJ0VWM6JAz21cYLGMMLn0PuQ"

WEB_APP_URL = "https://YOUR-WEBSITE.com/"


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):

    button = InlineKeyboardButton(
        text="🎮 شروع بازی XO",
        web_app=WebAppInfo(url=WEB_APP_URL)
    )

    keyboard = InlineKeyboardMarkup([
        [button]
    ])

    await update.message.reply_text(
        "🎮 به بازی XO خوش آمدی!\n\n"
        "برای شروع روی دکمه زیر بزن:",
        reply_markup=keyboard
    )


def main():

    app = Application.builder().token(BOT_TOKEN).build()

    app.add_handler(
        CommandHandler("start", start)
    )

    print("🤖 Bot is running...")

    app.run_polling()


if __name__ == "__main__":
    main()