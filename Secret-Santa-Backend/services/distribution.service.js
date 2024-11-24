const db = require("../config/db");
const emailService = require("../services/emailService.js");

// Assign Secret Santa
async function assignSecretSanta(gameCode) {
  const fetchUsersQuery = `
    SELECT u.id, u.name, u.email 
    FROM User u
    INNER JOIN User_Game ug ON u.id = ug.userId
    INNER JOIN Game g ON ug.gameId = g.id
    WHERE g.gameCode = ? limit 2`;

  try {
    // Fetch users associated with the given game code
    const [users] = await db.query(fetchUsersQuery, [gameCode]);

    if (users.length < 2) {
      throw new Error("Not enough participants for Secret Santa.");
    }

    const assignments = shuffleAndAssignSanta(users)
    await sendEmail(assignments)

    return assignments;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function sendEmail(assignments){
  for (const assignment of assignments) {
    const { name, email, assigned } = assignment;
    const emailSubject = `🎅 You are a Secret Santa 🎄`;
    await emailService.sendEmail(email, emailSubject, getEmailMessage(name, assigned.name))
  }
}

function shuffleAndAssignSanta(users) {
  return shuffleArray([...users]).map((user, index) => {
    const assignedIndex = (index + 1) % shuffledUsers.length;
    return {
      ...user,
      assigned: shuffledUsers[assignedIndex],
    };
  });
}

function getEmailMessage(name, santaFor) {
  return `<!DOCTYPE html>
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
        /* background: #ffffff; */
        background: repeating-linear-gradient(45deg, rgba(255, 237, 237, 0.3), rgba(255, 237, 237, 0.3) 10px, rgba(239, 35, 60, 0.3) 10px, rgba(239, 35, 60, 0.3) 20px);
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }
  
      /* Header with red & white stripes */
      .header {
        text-align: center;
        padding: 20px;
        background: whitesmoke;
        /* repeating-linear-gradient(45deg, rgba(255, 237, 237, 0.3), rgba(255, 237, 237, 0.3) 10px, rgba(239, 35, 60, 0.3) 10px, rgba(239, 35, 60, 0.3) 20px); */
        color: #003E1F;
        font-size: 28px;
        font-weight: bold;
        border-radius: 10px;
        letter-spacing: 1px;
        margin-bottom: 20px;
      }
  
      .header span {
        color: #e30f0f;
      }
  
      /* Greeting section */
      .greeting {
        text-align: center;
        color: #003E1F;
        font-size: 18px;
        margin: 15px 0;
        line-height: 1.6;
      }
  
      /* Assigned section with boxed style */
      .assigned {
        text-align: center;
        margin: 20px 0;
        font-size: 20px;
        /* font-weight: bold; */
        color: #FFFFFF;
        background: linear-gradient(135deg, #003E1F, #73BA9B);
        border-radius: 10px;
        padding: 15px;
        /* border: 2px solid #003E1F; */
      }
  
      /* Rules section with green stripes */
      .rules {
        font-size: 16px;
        color: #003E1F;
        margin-top: 20px;
        line-height: 1.8;
        padding: 10px;
        background: #f7f9fc;   
        /* background: repeating-linear-gradient(45deg, rgba(213, 242, 227, 0.3), rgba(213, 242, 227, 0.3) 10px, rgba(115, 186, 155, 0.3) 10px, rgba(115, 186, 155, 0.3) 20px); */
        border-radius: 10px;
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
        /* background: repeating-linear-gradient(45deg, rgba(255, 237, 237, 0.2), rgba(255, 237, 237, 0.2) 10px, rgba(239, 35, 60, 0.2) 10px, rgba(239, 35, 60, 0.2) 20px); */
        color: #3e0000;
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
        Hi <strong>${name}</strong>,<br>
        The festive season is here, and it’s time to spread the joy
         <!-- with <strong>Secret Santa!</strong> ✨ -->
      </div>
      <!-- Assignment -->
      <div class="assigned">
        🎁 You have been assigned to be the Secret Santa for:<br>
        ✨✨🎄<strong>${santaFor.toUpperCase()}</strong>🎄✨✨
      </div>
  
      <!-- Rules -->
      <div class="rules">
        🌟 <strong>Rules of the Game:</br>
        <ul>
          <li>Keep it a secret!</li>
          <li>Share joy and fun with your thoughtful gift.</li>
          <li>Make this holiday season special for your recipient!</li>
        </ul></strong>
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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

module.exports = { assignSecretSanta };
