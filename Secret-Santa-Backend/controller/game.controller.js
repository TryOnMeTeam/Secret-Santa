const { assignSecretSanta } = require("../services/distribution.service.js");
const { getGameInfo, joinUserToGame } = require("../services/game.service.js");
const emailService = require("../services/emailService.js");
require("dotenv").config();

/**
 * @api {POST} /api/game/createGame Create a New Game
 * @apiName CreateGame
 * @apiGroup Game
 * @apiVersion 1.0.0
 *
 * @apiDescription This endpoint is used to create a new game with the specified parameters.
 * The server will create a game record and return a success message along with the unique game ID and game details.
 *
 * @apiError (400) BadRequest The request is missing required fields or contains invalid values.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiExample {json} Request Example:
 * {
 *   "gameName": "Santa",
 *   "startDate": "2024-11-24T00:00:00Z",
 *   "endDate": "2024-11-30T00:00:00Z",
 *   "userId": 1234,
 *   "maxPlayers": 20
 * }
 *
 * @apiExample {json} Response Example:
 * {
 *   "message": "Game created successfully.",
 *   "gameID": "M3U7EIND",
 *   "game": {
 *     "gameID": "M3U7EIND",
 *     "gameName": "Santa",
 *     "startDate": "2024-11-24T00:00:00Z",
 *     "endDate": "2024-11-30T00:00:00Z",
 *     "userId": 1234,
 *     "maxPlayers": 20
 *   }
 * }
 */

exports.createGame = async (req, res) => {
  const { gameName, startDate, endDate, userId, maxPlayers } = req.body;

  try {
    if (!gameName || !startDate || !endDate || !userId || !maxPlayers) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Find the user by userId
    const user = { name: "Gopika", email: "gopika16aug@gmail.com" };
    //await db.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const gameCode = generateUniqueGameID(userId);
    const newGame = {
      gameCode,
      gameName,
      startDate,
      endDate,
      userId,
      maxPlayers,
    };

    const emailSubject = "🎅🎄 Your Secret Santa Game Code is Here! 🎁✨";
    await emailService.sendEmail(
      user.email,
      emailSubject,
      getEmailMessage(user.name, gameCode)
    );

    res
      .status(201)
      .json({
        message: "Game created successfully.",
        gameID: gameCode,
        game: newGame,
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

/**
 * @api {POST} /api/game/startGame/:gameCode Start Secret Santa Game
 * @apiName StartSecretSantaGame
 * @apiGroup Game
 * @apiVersion 1.0.0
 *
 * @apiDescription This endpoint is used to start a "Secret Santa" game with a specific game code. Upon successful execution, the game will begin and the server will return a message indicating that the Secret Santa assignments have been completed. The game code (`gameCode`) is used to identify the specific game instance to start.
 *
 * @apiParam {String} gameCode The unique code of the game. This is used to identify and start the specific game. (e.g., "XMAS2024")
 *
 * @apiSuccess {String} message Success message indicating that the Secret Santa assignments were completed successfully. (e.g., "Secret Santa assignments completed successfully!")
 *
 * @apiError (404) NotFound The game with the specified `gameCode` does not exist.
 * @apiError (400) BadRequest The game has already been started or the request is invalid.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiExample {json} Request Example:
 * {
 *   "gameCode": "XMAS2024"
 * }
 *
 * @apiExample {json} Response Example:
 * {
 *   "message": "Secret Santa assignments completed successfully!"
 * }
 */

exports.startGame = async (req, res) => {
  const { gameCode } = req.body;

  if (!gameCode) {
    return res.status(400).json({ message: "Game code is required." });
  }

  try {
    const assignments = await assignSecretSanta(gameCode);
    res.status(200).json({
      message: "Secret Santa assignments completed successfully!",
      assignments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generate a unique game ID
function generateUniqueGameID(userId) {
  const timestamp = Date.now().toString(36);
  const userPart = userId.toString(36).slice(-2);
  return (userPart + timestamp).slice(0, 8).toUpperCase();
}

// Get game info
exports.getGameInfo = async (req, res) => {
  const { gameCode } = req.params;
  try {
    const gameInfo = await getGameInfo(gameCode);
    res.status(200).json(gameInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Join user to a game
exports.joinUserToGame = async (req, res) => {
  const { userId, gameCode } = req.body;
  try {
    const result = await joinUserToGame(userId, gameCode);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


function getEmailMessage(name, gameCode) {
  return `
  <!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 0;
      background: #f7f9fc;
    }

    .email-container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background: repeating-linear-gradient(45deg, rgba(255, 237, 237, 0.3), rgba(255, 237, 237, 0.3) 10px, rgba(239, 35, 60, 0.3) 10px, rgba(239, 35, 60, 0.3) 20px);
      border-radius: 15px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    /* Header with red & white stripes */
    .header {
      text-align: center;
      padding: 20px;
      background: whitesmoke;
      color: #003E1F;
      font-size: 28px;
      font-weight: bold;
      border-radius: 10px;
      letter-spacing: 1px;
      margin-bottom: 20px;
    }

    .header span {
      color: #EF233C;
    }

    /* Greeting section */
    .greeting {
      text-align: center;
      color: #003E1F;
      font-size: 18px;
      margin: 15px 0;
      line-height: 1.6;
    }

    /* Rules section with green stripes */
    .rules {
      font-size: 16px;
      color: #003E1F;
      margin-top: 20px;
      line-height: 1.8;
      padding: 10px;
      background: rgba(213, 242, 227, 0.7);
      border-radius: 10px;
    }

    .assigned {
      text-align: center;
      margin: 20px 0;
      font-size: 20px;
      color: #FFFFFF;
      background: linear-gradient(135deg, #003E1F, #73BA9B);
      border-radius: 10px;
      padding: 15px;
    }

    /* List styling for rules */
    .rules ul {
      padding-left: 20px;
      margin: 0;
      list-style-type: none;
    }

    .rules ul li {
      margin-bottom: 10px;
      color: #003E1F;
    }

    .rules ul li::before {
      content: '🎁 ';
      font-size: 16px;
      color: #EF233C;
    }

    /* Footer section with red & white stripes */
    .footer {
      text-align: center;
      margin-top: 20px;
      padding: 15px;
      color: #003E1F;
      font-size: 16px;
      font-weight: bold;
      border-radius: 10px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="header">
      🎅 <span>Secret Santa</span> 🎄
    </div>

    <!-- Greeting -->
    <div class="greeting">
      Ho Ho Ho, <strong>${name}!</strong> 🎅<br><br>
      The 🎄 Christmas magic is here, and ✨✨<strong>SECRET SANTA</strong>✨✨ is about to begin! 🎄🎁<br><br>
      Your Exclusive Game Code: 
    <div class="assigned"><strong>${gameCode}</strong><br></div>
      Share this special code with all participants and let the fun begin! 🎁 This is your ticket to a world of secret gifts, surprises, and festive cheer! 🎊
    </div>

    <!-- Rules section -->
    <div class="rules">
      🌟 <strong>Rules of the Game:</strong><br>
      <ul>
        <li>Keep it secret, keep it fun!</li>
        <li>Share joy and make someone's Christmas magical! 🎅</li>
      </ul>
    </div>

    <!-- Footer -->
    <div class="footer">
      🎄 Wishing you a joyful gifting experience!<br>
      <strong>Happy gifting, SecretSanta Team 🎁</strong>
    </div>
  </div>
</body>
</html>

  `;
}

