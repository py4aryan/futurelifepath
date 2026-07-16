/**
 * questLibrary.js
 *
 * A comprehensive quest library covering every survey option.
 * Quests are organized by each category of survey answer so the engine
 * can dynamically assemble a personalized daily set for any combination
 * the user could possibly select.
 *
 * generateDailyQuests(profile) → array of 4–5 quest objects ready to be
 * saved as Skill documents.
 */

// ─── QUEST POOLS ─────────────────────────────────────────────────────────────

const GOAL_QUESTS = {
  'Career Growth': [
    { title: 'Update Your LinkedIn Profile',     description: 'Add one new skill or achievement, and refresh your headline to match your current goals.',                          type: 'main',      duration: '20 min', xp: 80,  category: 'productivity', difficulty: 'easy'   },
    { title: 'Research Your Dream Role',          description: 'Read 3 job postings for your target role and list the top 3 skills they all share.',                               type: 'main',      duration: '15 min', xp: 60,  category: 'learning',     difficulty: 'easy'   },
    { title: 'Network Outreach',                  description: 'Send one genuine, personalised message to someone working in your target field.',                                  type: 'challenge', duration: '10 min', xp: 100, category: 'social',       difficulty: 'medium' },
    { title: 'Portfolio Work Session',            description: 'Spend 30 focused minutes building or polishing one project you can show future employers.',                        type: 'main',      duration: '30 min', xp: 120, category: 'productivity', difficulty: 'hard'   },
    { title: 'Industry News Digest',              description: 'Read one in-depth article about trends in your field and summarise 3 key takeaways.',                             type: 'habit',     duration: '10 min', xp: 40,  category: 'learning',     difficulty: 'easy'   },
    { title: 'Skill Gap Analysis',               description: 'List the top 3 skills your target roles require that you do not yet have. Write a plan to close each gap.',       type: 'main',      duration: '20 min', xp: 90,  category: 'productivity', difficulty: 'medium' },
    { title: 'Behavioural Interview Practice',    description: 'Answer one STAR-format interview question out loud. Record yourself and review the playback.',                    type: 'challenge', duration: '15 min', xp: 110, category: 'social',       difficulty: 'medium' },
  ],
  'Financial Freedom': [
    { title: "Track Yesterday's Spending",        description: 'Log every expense from yesterday into a budget tracker and categorise each one.',                                  type: 'habit',     duration: '10 min', xp: 40,  category: 'productivity', difficulty: 'easy'   },
    { title: 'Personal Finance Reading',          description: 'Read one article or chapter on investing, savings, or wealth-building. Write down one actionable insight.',       type: 'main',      duration: '20 min', xp: 70,  category: 'learning',     difficulty: 'easy'   },
    { title: 'No-Spend Challenge',                description: 'Complete today without any non-essential purchases. Track every temptation you overcome.',                        type: 'challenge', duration: 'All day', xp: 150, category: 'other',        difficulty: 'hard'   },
    { title: 'Find One Savings Opportunity',      description: 'Identify one recurring expense you can cut or reduce. Research cheaper alternatives if needed.',                  type: 'main',      duration: '15 min', xp: 80,  category: 'productivity', difficulty: 'medium' },
    { title: 'Income Stream Brainstorm',          description: 'Write 5 potential side-income ideas based on your existing skills. Rate each by effort and earning potential.',  type: 'main',      duration: '20 min', xp: 90,  category: 'creative',     difficulty: 'medium' },
    { title: 'Monthly Budget Review',             description: 'Compare planned vs actual spending this month. Adjust categories for the remainder.',                             type: 'challenge', duration: '25 min', xp: 120, category: 'productivity', difficulty: 'medium' },
    { title: 'Investment Vehicle Research',       description: 'Learn about one investment option (index fund, Roth IRA, ETF) you are not currently using.',                     type: 'main',      duration: '20 min', xp: 80,  category: 'learning',     difficulty: 'medium' },
  ],
  'Work-Life Balance': [
    { title: 'Digital Sunset',                    description: 'Turn off all work notifications 2 hours before bed tonight and journal how it felt.',                             type: 'habit',     duration: '2 hr block', xp: 60, category: 'health',     difficulty: 'medium' },
    { title: 'Block Recovery Time',               description: 'Schedule at least 1 hour this week as a non-negotiable personal recovery block in your calendar.',               type: 'main',      duration: '10 min',    xp: 50, category: 'productivity', difficulty: 'easy'  },
    { title: 'Guilt-Free Activity',               description: 'Do one thing you enjoy completely guilt-free — a hobby, walk, or rest — with zero multitasking.',               type: 'challenge', duration: '30 min',    xp: 80, category: 'health',     difficulty: 'medium' },
    { title: 'Set Work Hour Boundaries',          description: 'Define an official start and end time for work today and honour both strictly.',                                  type: 'habit',     duration: '5 min',     xp: 50, category: 'productivity', difficulty: 'easy'  },
    { title: 'Mindful Lunch Break',               description: 'Step away from your desk completely at lunch. No screens, no work. Eat slowly and mindfully.',                  type: 'habit',     duration: '30 min',    xp: 60, category: 'health',     difficulty: 'easy'  },
    { title: 'Energy Audit',                      description: 'List your top 3 energy drains and top 3 energy givers right now. Plan one shift this week.',                    type: 'main',      duration: '15 min',    xp: 70, category: 'other',      difficulty: 'medium' },
  ],
  'Creative Fulfillment': [
    { title: '15-Minute Free Create',             description: 'Make something with zero goal or judgment — draw, write, play, sculpt. Pure expression.',                        type: 'habit',     duration: '15 min', xp: 50,  category: 'creative',     difficulty: 'easy'   },
    { title: 'Finish One Creative Task',          description: 'Complete one creative piece you have been procrastinating on — however small it is.',                            type: 'main',      duration: '30 min', xp: 100, category: 'creative',     difficulty: 'medium' },
    { title: 'Consume to Inspire',                description: 'Read, watch, or listen to one work of art that inspires you. Take notes on what resonates.',                    type: 'habit',     duration: '20 min', xp: 50,  category: 'creative',     difficulty: 'easy'   },
    { title: 'Share Your Work',                   description: 'Post or share one piece of your creative work online or with a friend. Embrace the vulnerability.',              type: 'challenge', duration: '15 min', xp: 120, category: 'social',       difficulty: 'hard'   },
    { title: 'Morning Pages',                     description: 'Write 3 pages of uncensored, stream-of-consciousness thoughts first thing — no editing, no re-reading.',        type: 'habit',     duration: '20 min', xp: 60,  category: 'creative',     difficulty: 'easy'   },
    { title: 'Learn a Creative Technique',        description: 'Watch one tutorial in your creative discipline and immediately try applying the technique.',                     type: 'main',      duration: '25 min', xp: 90,  category: 'creative',     difficulty: 'medium' },
  ],
  'Leadership': [
    { title: 'Give Meaningful Feedback',          description: 'Give one piece of specific, constructive, and kind feedback to someone in your life or work.',                   type: 'challenge', duration: '15 min', xp: 110, category: 'social',       difficulty: 'medium' },
    { title: 'Leadership Content Block',          description: 'Read or listen to 20 minutes of leadership-focused material. Write one actionable insight.',                    type: 'habit',     duration: '20 min', xp: 60,  category: 'learning',     difficulty: 'easy'   },
    { title: 'Active Listening Practice',         description: 'In your next conversation, focus entirely on listening — no planning your reply while they speak.',             type: 'habit',     duration: 'Next convo', xp: 70, category: 'social',    difficulty: 'medium' },
    { title: 'Delegate One Task',                 description: 'Identify one task you are holding onto and hand it off clearly with context and expectations.',                 type: 'challenge', duration: '20 min', xp: 100, category: 'productivity', difficulty: 'hard'   },
    { title: 'Define Your Leadership Values',     description: 'Write down 3 values you want to lead by. Back each one with a real example from your past.',                   type: 'main',      duration: '20 min', xp: 80,  category: 'other',        difficulty: 'medium' },
    { title: 'Coach Someone Today',               description: 'Spend 15 minutes helping someone with something they are struggling with — no agenda, just support.',           type: 'challenge', duration: '15 min', xp: 100, category: 'social',       difficulty: 'medium' },
  ],
  'Learning New Skills': [
    { title: 'Focused Learning Block',            description: 'Spend 25 uninterrupted minutes learning something in a skill you are building. Phone in another room.',         type: 'main',      duration: '25 min', xp: 100, category: 'learning',     difficulty: 'medium' },
    { title: 'Teach What You Learned',            description: 'Explain one thing you recently learned to someone else — or write it as if teaching a complete beginner.',     type: 'challenge', duration: '15 min', xp: 90,  category: 'learning',     difficulty: 'medium' },
    { title: 'Spaced Repetition Review',          description: 'Review flashcards or notes from a previous session to reinforce long-term retention.',                         type: 'habit',     duration: '10 min', xp: 40,  category: 'learning',     difficulty: 'easy'   },
    { title: 'Complete a Course Module',          description: 'Finish at least one lesson or module in an online course you are currently enrolled in.',                       type: 'main',      duration: '20 min', xp: 80,  category: 'learning',     difficulty: 'easy'   },
    { title: 'Deliberate Practice',               description: 'Identify a specific weak area in a skill and drill it intentionally for 20 focused minutes.',                  type: 'challenge', duration: '20 min', xp: 110, category: 'learning',     difficulty: 'hard'   },
    { title: 'Educational Podcast',               description: 'Listen to one educational episode. Write 3 key points immediately after.',                                      type: 'habit',     duration: '25 min', xp: 50,  category: 'learning',     difficulty: 'easy'   },
  ],
  'Starting a Business': [
    { title: 'Customer Discovery Interview',      description: 'Talk to one potential customer. Ask about their pain points — not your solution. Listen closely.',              type: 'challenge', duration: '20 min', xp: 120, category: 'social',       difficulty: 'hard'   },
    { title: 'Competitive Research',              description: 'Analyse one competitor. Note their strengths, weaknesses, pricing, and positioning.',                           type: 'main',      duration: '20 min', xp: 80,  category: 'learning',     difficulty: 'medium' },
    { title: 'MVP Work Session',                  description: 'Spend 30 minutes building, designing, or writing a core part of your minimum viable product.',                 type: 'main',      duration: '30 min', xp: 120, category: 'productivity', difficulty: 'hard'   },
    { title: 'Build in Public',                   description: 'Share your progress — what you are building and why — on one social platform. Be authentic.',                  type: 'challenge', duration: '15 min', xp: 100, category: 'social',       difficulty: 'medium' },
    { title: 'Revenue Model Thinking',            description: 'Write 3 different ways your idea could make money. Evaluate the pros and cons of each model.',                type: 'main',      duration: '20 min', xp: 80,  category: 'productivity', difficulty: 'medium' },
    { title: 'Founder Story Study',               description: 'Read or watch one founder story or case study. Extract one lesson you can apply this week.',                   type: 'habit',     duration: '20 min', xp: 60,  category: 'learning',     difficulty: 'easy'   },
  ],
  'Health & Wellness': [
    { title: 'Morning Movement',                  description: 'Do 10 minutes of stretching, yoga, or light exercise immediately after waking up.',                             type: 'habit',     duration: '10 min', xp: 50,  category: 'health',       difficulty: 'easy'   },
    { title: 'Hydration Goal',                    description: 'Drink 8 glasses of water today. Set a phone reminder every 2 hours to stay on track.',                         type: 'habit',     duration: 'All day', xp: 40, category: 'health',       difficulty: 'easy'   },
    { title: 'Structured Workout',                description: 'Complete a full workout — strength, cardio, or a class — with intention and a clear plan.',                    type: 'main',      duration: '30 min', xp: 100, category: 'health',       difficulty: 'medium' },
    { title: 'Mindful Eating Check-In',           description: 'Eat one meal without any screens. Notice hunger and fullness cues. Eat slowly.',                               type: 'habit',     duration: '20 min', xp: 50,  category: 'health',       difficulty: 'easy'   },
    { title: 'Sleep Prep Ritual',                 description: 'Start winding down 45 minutes before sleep — dim lights, no screens, calming activity.',                       type: 'habit',     duration: '45 min', xp: 60,  category: 'health',       difficulty: 'medium' },
    { title: 'Nature Walk',                       description: 'Take a 10-minute walk outside without headphones. Notice your surroundings intentionally.',                     type: 'habit',     duration: '10 min', xp: 40,  category: 'health',       difficulty: 'easy'   },
    { title: 'Healthy Meal Prep',                 description: 'Prepare one nutritious meal from whole ingredients. No processed food.',                                        type: 'main',      duration: '25 min', xp: 80,  category: 'health',       difficulty: 'medium' },
  ],
};

const INTEREST_QUESTS = {
  'Technology': [
    { title: 'Code for 20 Minutes',              description: 'Work on a personal project or complete a coding challenge on LeetCode or Codewars.',                             type: 'main',      duration: '20 min', xp: 90,  category: 'learning',     difficulty: 'medium' },
    { title: 'Tech Article Deep-Read',           description: 'Read one in-depth article from Hacker News, a dev blog, or a research paper. Take notes.',                      type: 'habit',     duration: '15 min', xp: 40,  category: 'learning',     difficulty: 'easy'   },
    { title: 'Explore a New Tool',               description: 'Spend 20 minutes experimenting with a framework, API, or tool you have been curious about.',                    type: 'challenge', duration: '20 min', xp: 100, category: 'learning',     difficulty: 'medium' },
  ],
  'Arts & Design': [
    { title: 'Daily Sketch',                     description: 'Fill one page with sketches — observation drawings, character concepts, or abstract shapes.',                    type: 'habit',     duration: '15 min', xp: 50,  category: 'creative',     difficulty: 'easy'   },
    { title: 'Study a Designer',                 description: 'Analyse the work of one designer you admire. Write 3 things they do exceptionally well.',                       type: 'main',      duration: '15 min', xp: 60,  category: 'creative',     difficulty: 'easy'   },
    { title: 'Complete a Design Piece',          description: 'Finish one piece of visual work — a poster, icon, illustration, or UI component — from start to done.',         type: 'main',      duration: '30 min', xp: 100, category: 'creative',     difficulty: 'medium' },
  ],
  'Business': [
    { title: 'Business Case Analysis',           description: 'Read about one company strategy or pivot. Identify why it succeeded or failed.',                                 type: 'main',      duration: '20 min', xp: 80,  category: 'learning',     difficulty: 'medium' },
    { title: 'Pitch Practice',                   description: 'Rehearse a 60-second pitch for an idea — business, project, or proposal — out loud to yourself.',               type: 'challenge', duration: '15 min', xp: 90,  category: 'social',       difficulty: 'medium' },
    { title: 'Marketing Experiment',             description: 'Write a social post, email subject, or ad headline for a product. Draft two versions and compare.',              type: 'main',      duration: '20 min', xp: 80,  category: 'creative',     difficulty: 'medium' },
  ],
  'Science': [
    { title: 'Science Summary Read',             description: 'Read one peer-reviewed abstract or science news article. Summarise it in plain English in 3 sentences.',        type: 'habit',     duration: '15 min', xp: 50,  category: 'learning',     difficulty: 'easy'   },
    { title: 'Observation Exercise',             description: 'Observe something in everyday life and form a hypothesis about why it works the way it does.',                   type: 'challenge', duration: '20 min', xp: 80,  category: 'learning',     difficulty: 'medium' },
    { title: 'Science Deep Dive',                description: 'Spend 25 minutes studying one concept you have been curious about. Go beyond surface-level.',                   type: 'main',      duration: '25 min', xp: 90,  category: 'learning',     difficulty: 'medium' },
  ],
  'Writing': [
    { title: 'Write 500 Words',                  description: 'Write 500 words on any topic — fiction, blog, journal, or a letter. No editing while writing.',                 type: 'main',      duration: '20 min', xp: 80,  category: 'creative',     difficulty: 'medium' },
    { title: 'Edit a Past Piece',                description: 'Revisit something you wrote before. Revise for clarity, flow, and impact — cut the fat.',                       type: 'challenge', duration: '20 min', xp: 90,  category: 'creative',     difficulty: 'medium' },
    { title: 'Read Like a Writer',               description: 'Read one passage and analyse the author\'s technique — structure, voice, sentence rhythm, word choice.',        type: 'habit',     duration: '15 min', xp: 50,  category: 'learning',     difficulty: 'easy'   },
  ],
  'Education': [
    { title: 'Review Study Notes',               description: 'Re-read and annotate notes from your most recent study session to solidify understanding.',                     type: 'habit',     duration: '15 min', xp: 40,  category: 'learning',     difficulty: 'easy'   },
    { title: 'Teach a Concept',                  description: 'Explain a topic you are studying to a friend, family member, or in your journal. Teaching = understanding.',    type: 'challenge', duration: '15 min', xp: 90,  category: 'learning',     difficulty: 'medium' },
    { title: 'Complete an Assignment',           description: 'Make meaningful progress on one assignment or course task due soon. Aim for a complete draft.',                  type: 'main',      duration: '30 min', xp: 100, category: 'learning',     difficulty: 'medium' },
  ],
  'Healthcare': [
    { title: 'Medical Concept Study',            description: 'Study one anatomy, pharmacology, or clinical concept for 20 minutes. Quiz yourself afterward.',                 type: 'main',      duration: '20 min', xp: 80,  category: 'learning',     difficulty: 'medium' },
    { title: 'Wellness Check-In',                description: 'Spend 5 minutes reflecting on your physical, mental, and emotional health. Note one thing to improve.',         type: 'habit',     duration: '5 min',  xp: 40,  category: 'health',       difficulty: 'easy'   },
    { title: 'Patient Communication Practice',   description: 'Practice explaining a health concept simply and compassionately — as if speaking to a nervous patient.',        type: 'challenge', duration: '15 min', xp: 90,  category: 'social',       difficulty: 'medium' },
  ],
  'Sports': [
    { title: 'Sport Practice Session',           description: 'Do a focused training session — drills, technique work, or sport-specific conditioning.',                       type: 'main',      duration: '30 min', xp: 100, category: 'health',       difficulty: 'hard'   },
    { title: 'Study Game Film or Tactics',       description: 'Watch 15 minutes of footage or read about tactics in your sport. Take mental notes on what you can apply.',     type: 'habit',     duration: '15 min', xp: 50,  category: 'learning',     difficulty: 'easy'   },
    { title: 'Recovery Protocol',                description: 'Do a full cool-down and recovery session — stretching, foam rolling, or mobility work.',                        type: 'habit',     duration: '15 min', xp: 50,  category: 'health',       difficulty: 'easy'   },
  ],
  'Music': [
    { title: 'Deliberate Instrument Practice',   description: 'Spend 20 minutes on deliberate practice — scales, a difficult passage, or a new song section.',                type: 'main',      duration: '20 min', xp: 80,  category: 'creative',     difficulty: 'medium' },
    { title: 'Ear Training',                     description: 'Spend 10 minutes on ear training — intervals, chord recognition, or transcribing a melody by ear.',             type: 'habit',     duration: '10 min', xp: 50,  category: 'learning',     difficulty: 'easy'   },
    { title: 'Compose or Improvise',             description: 'Spend 15 minutes creating something original — a riff, chord progression, or a full rough sketch.',             type: 'challenge', duration: '15 min', xp: 90,  category: 'creative',     difficulty: 'medium' },
  ],
  'Travel': [
    { title: 'Plan Your Next Adventure',         description: 'Research one destination — accommodation, activities, and rough budget. Build an itinerary skeleton.',           type: 'main',      duration: '20 min', xp: 70,  category: 'creative',     difficulty: 'easy'   },
    { title: 'Learn Travel Phrases',             description: 'Learn 10 useful phrases in the language of a country you want to visit.',                                        type: 'habit',     duration: '10 min', xp: 40,  category: 'learning',     difficulty: 'easy'   },
    { title: 'Travel Savings Calculation',       description: 'Calculate your weekly savings target for a trip you want. Set up the auto-transfer today.',                     type: 'challenge', duration: '15 min', xp: 90,  category: 'productivity', difficulty: 'medium' },
  ],
};

const STRENGTH_QUESTS = {
  'Problem Solving': [
    { title: 'Solve a Hard Problem',             description: 'Pick one unsolved problem and spend 20 minutes brainstorming solutions — no judging ideas yet.',                type: 'main',      duration: '20 min', xp: 90,  category: 'productivity', difficulty: 'medium' },
    { title: '5-Whys Root Cause Analysis',       description: 'Take one recurring problem and use the "5 Whys" method to uncover the true root cause.',                        type: 'challenge', duration: '15 min', xp: 100, category: 'productivity', difficulty: 'medium' },
  ],
  'Communication': [
    { title: 'Write a Clear Message',            description: 'Draft one important message and rewrite it until it is as clear and direct as possible. Then send it.',         type: 'habit',     duration: '10 min', xp: 50,  category: 'social',       difficulty: 'easy'   },
    { title: 'Meaningful Conversation',          description: 'Have one intentional conversation today — ask thoughtful questions and truly listen to the answers.',            type: 'challenge', duration: '20 min', xp: 80,  category: 'social',       difficulty: 'medium' },
  ],
  'Leadership': [
    { title: 'Step Up in a Group',               description: 'Volunteer to lead, organise, or facilitate something in a group setting today.',                                type: 'challenge', duration: '30 min', xp: 110, category: 'social',       difficulty: 'hard'   },
    { title: 'Recognise Someone',                description: 'Find one opportunity to genuinely encourage or recognise someone else\'s effort today.',                        type: 'habit',     duration: '5 min',  xp: 60,  category: 'social',       difficulty: 'easy'   },
  ],
  'Creativity': [
    { title: 'Brainstorm Sprint',                description: 'Set a timer for 10 minutes and generate 20 ideas on any topic — quantity over quality, no filter.',             type: 'habit',     duration: '10 min', xp: 50,  category: 'creative',     difficulty: 'easy'   },
    { title: 'Creative Problem Solving',         description: 'Take one challenge you are facing and brainstorm 5 unconventional solutions you have not considered.',           type: 'main',      duration: '15 min', xp: 80,  category: 'creative',     difficulty: 'medium' },
  ],
  'Analytical Thinking': [
    { title: 'Data-Driven Decision',             description: 'For one decision you face, gather real data and list pros/cons with concrete evidence before choosing.',         type: 'main',      duration: '20 min', xp: 90,  category: 'productivity', difficulty: 'medium' },
    { title: 'System Analysis',                  description: 'Pick a system or product you use daily. Analyse how it works and identify where it could be improved.',         type: 'challenge', duration: '15 min', xp: 80,  category: 'learning',     difficulty: 'medium' },
  ],
  'Adaptability': [
    { title: 'Change One Routine',               description: 'Deliberately change one routine today — a different route, method, or approach. Embrace the discomfort.',       type: 'habit',     duration: '5 min',  xp: 40,  category: 'other',        difficulty: 'easy'   },
    { title: 'Pivot Challenge',                  description: 'Take a project or task and brainstorm 3 alternative approaches you have not yet tried.',                        type: 'challenge', duration: '15 min', xp: 80,  category: 'productivity', difficulty: 'medium' },
  ],
  'Time Management': [
    { title: 'Time-Block Tomorrow',              description: 'Plan tomorrow in 30-minute blocks. Assign every waking hour to a specific task or category.',                   type: 'habit',     duration: '10 min', xp: 50,  category: 'productivity', difficulty: 'easy'   },
    { title: 'Identify Your 3 MITs',             description: 'Write your 3 Most Important Tasks before checking any messages or social media. Do them first.',                type: 'main',      duration: '5 min',  xp: 60,  category: 'productivity', difficulty: 'easy'   },
  ],
  'Teamwork': [
    { title: 'Support a Teammate',               description: 'Proactively ask one person you work or study with if there is anything they need help with today.',             type: 'habit',     duration: '10 min', xp: 50,  category: 'social',       difficulty: 'easy'   },
    { title: 'Collaborative Work Session',       description: 'Work alongside someone on a shared goal. Practise giving and receiving ideas openly.',                           type: 'challenge', duration: '30 min', xp: 90,  category: 'social',       difficulty: 'medium' },
  ],
};

const WEAKNESS_QUESTS = {
  'Procrastination': [
    { title: '2-Minute Start Rule',              description: 'Pick your most dreaded task and commit to just 2 minutes of it. Start — the momentum will carry you.',          type: 'main',      duration: '2+ min', xp: 90,  category: 'productivity', difficulty: 'medium' },
    { title: 'Eat the Frog',                     description: 'Do your hardest, most avoided task FIRST today — before email, social media, or anything else.',                type: 'challenge', duration: '30 min', xp: 120, category: 'productivity', difficulty: 'hard'   },
    { title: 'Anti-Procrastination Log',         description: 'Write the task you have been avoiding, your real reason for it, and your very next smallest step.',             type: 'habit',     duration: '5 min',  xp: 50,  category: 'productivity', difficulty: 'easy'   },
    { title: 'Pomodoro Sprint',                  description: 'Complete one 25-minute Pomodoro on a postponed task. Phone in another room, timer running.',                    type: 'main',      duration: '25 min', xp: 100, category: 'productivity', difficulty: 'medium' },
  ],
  'Public Speaking': [
    { title: 'Record Yourself Speaking',         description: 'Record a 2-minute video on any topic. Watch it back and note exactly one thing to improve next time.',          type: 'challenge', duration: '10 min', xp: 110, category: 'social',       difficulty: 'hard'   },
    { title: 'Speak Up in a Group',              description: 'In your next group — meeting, class, or call — make at least one verbal contribution before it ends.',          type: 'challenge', duration: 'Next group', xp: 100, category: 'social',  difficulty: 'medium' },
    { title: '3-Minute Speech Practice',         description: 'Pick a topic and talk about it out loud for 3 minutes. Stand up, use gestures, face an imaginary audience.',   type: 'main',      duration: '10 min', xp: 90,  category: 'social',       difficulty: 'medium' },
  ],
  'Technical Skills': [
    { title: 'Technical Tutorial',               description: 'Follow one tutorial in an area you feel weak in — code, spreadsheets, design tools, or any tech skill.',       type: 'main',      duration: '25 min', xp: 100, category: 'learning',     difficulty: 'medium' },
    { title: 'Fix One Technical Problem',        description: 'Identify one technical issue you have been avoiding. Work through it until it is resolved.',                    type: 'challenge', duration: '20 min', xp: 110, category: 'learning',     difficulty: 'hard'   },
    { title: 'Tech Skill Drill',                 description: 'Spend 15 minutes actively practising in a technical tool or skill you want to improve.',                       type: 'habit',     duration: '15 min', xp: 60,  category: 'learning',     difficulty: 'easy'   },
  ],
  'Patience': [
    { title: 'Mindful Breath Check',             description: 'Set 3 alarms today. When each goes off, take 5 slow breaths before continuing what you were doing.',            type: 'habit',     duration: '3×2 min', xp: 50, category: 'health',       difficulty: 'easy'   },
    { title: 'Pause Before Reacting',            description: 'Next time you feel reactive or frustrated, pause 10 seconds before responding. Log what happened.',             type: 'challenge', duration: 'On trigger', xp: 90, category: 'other',    difficulty: 'medium' },
    { title: 'Long-Game Reflection',             description: 'Write about one goal that will take 6+ months. Visualise the compound effect of small daily progress.',         type: 'main',      duration: '10 min', xp: 70,  category: 'other',        difficulty: 'easy'   },
  ],
  'Delegation': [
    { title: 'Delegate One Task Today',          description: 'Identify a task someone else could handle. Explain it clearly with context and expectations, then hand it off.', type: 'challenge', duration: '15 min', xp: 100, category: 'productivity', difficulty: 'hard'  },
    { title: 'Over-Owned Task Audit',            description: 'List everything on your plate. Identify which task drains you most and plan to delegate or automate it.',        type: 'main',      duration: '15 min', xp: 80,  category: 'productivity', difficulty: 'medium' },
  ],
  'Risk-Taking': [
    { title: 'Do One Uncomfortable Thing',       description: 'Do one small but uncomfortable thing today — start a conversation, make an ask, submit something imperfect.',   type: 'challenge', duration: '10 min', xp: 110, category: 'other',        difficulty: 'hard'   },
    { title: 'Worst-Case Mapping',               description: 'For a risk you are avoiding: write the worst, best, and most likely outcome. Is the risk actually worth it?',   type: 'main',      duration: '15 min', xp: 80,  category: 'other',        difficulty: 'medium' },
  ],
  'Self-Confidence': [
    { title: 'Evidence Journaling',              description: 'Write 3 specific times you demonstrated genuine competence in your field this past month.',                      type: 'habit',     duration: '5 min',  xp: 50,  category: 'other',        difficulty: 'easy'   },
    { title: 'Affirmation Practice',             description: 'Write 5 specific affirmations that counter your self-doubt. Say each one out loud 3 times with conviction.',    type: 'habit',     duration: '5 min',  xp: 40,  category: 'other',        difficulty: 'easy'   },
    { title: 'Own Your Opinion',                 description: 'In your next conversation, share your honest view on something without immediately softening or qualifying it.',  type: 'challenge', duration: 'Next convo', xp: 100, category: 'social',   difficulty: 'medium' },
  ],
  'Work-Life Balance': [
    { title: 'Hard Stop at End of Day',          description: 'Set a work end-time today and stop completely when it arrives — no "one more thing."',                           type: 'habit',     duration: 'All day', xp: 60, category: 'health',       difficulty: 'medium' },
    { title: 'Protect Personal Time',            description: 'Block one personal hour in your calendar as an unmovable appointment and honour it fully.',                      type: 'main',      duration: '5 min',  xp: 70,  category: 'health',       difficulty: 'easy'   },
  ],
};

const SITUATION_QUESTS = {
  'Student': [
    { title: 'Active Recall Study Session',      description: 'Study for 20 minutes using active recall — test yourself instead of passively re-reading notes.',               type: 'main',      duration: '20 min', xp: 80,  category: 'learning',     difficulty: 'medium' },
    { title: 'Organise Your Deadlines',          description: 'Write all upcoming assignments and exams into one calendar. Prioritise by urgency and importance.',              type: 'habit',     duration: '10 min', xp: 50,  category: 'productivity', difficulty: 'easy'   },
    { title: 'Ask One Question Today',           description: 'Ask one question in class, at office hours, or to a peer that you have been too shy to ask.',                   type: 'challenge', duration: '5 min',  xp: 80,  category: 'social',       difficulty: 'medium' },
  ],
  'Early Career': [
    { title: 'Professional Skill Study',         description: 'Spend 20 minutes learning a skill that is common in your field but not yet formally in your toolkit.',          type: 'main',      duration: '20 min', xp: 80,  category: 'learning',     difficulty: 'medium' },
    { title: 'LinkedIn Connection',              description: 'Add one thoughtful connection on LinkedIn with a personalised note explaining why you would like to connect.',   type: 'challenge', duration: '10 min', xp: 80,  category: 'social',       difficulty: 'medium' },
    { title: 'Achievement Documentation',        description: 'Write 3 specific accomplishments from the past month using numbers or outcomes where possible.',                 type: 'habit',     duration: '10 min', xp: 50,  category: 'productivity', difficulty: 'easy'   },
  ],
  'Mid-Career': [
    { title: 'Strategic Career Reflection',      description: 'Write where you want to be in 5 years. Identify the biggest gap between that vision and today.',               type: 'main',      duration: '20 min', xp: 90,  category: 'productivity', difficulty: 'medium' },
    { title: 'Mentor Someone Junior',            description: 'Offer 15 minutes of honest guidance, advice, or feedback to someone earlier in their career than you.',         type: 'challenge', duration: '15 min', xp: 100, category: 'social',       difficulty: 'medium' },
    { title: 'Resume Update',                    description: 'Add or refine one section of your resume — especially recent achievements, results, and impact metrics.',       type: 'main',      duration: '20 min', xp: 80,  category: 'productivity', difficulty: 'medium' },
  ],
  'Career Change': [
    { title: 'Research Your Target Field',       description: 'Spend 20 minutes reading about day-in-the-life content, required skills, and entry points for your new path.', type: 'main',      duration: '20 min', xp: 80,  category: 'learning',     difficulty: 'medium' },
    { title: 'Transferable Skills Audit',        description: 'List 5 skills from your current role that are valuable in your target career. Plan how to highlight them.',     type: 'main',      duration: '15 min', xp: 80,  category: 'productivity', difficulty: 'medium' },
    { title: 'Informational Interview Outreach', description: 'Message someone working in your target field and request a 15-minute informational conversation.',              type: 'challenge', duration: '10 min', xp: 110, category: 'social',       difficulty: 'hard'   },
  ],
  'Freelancer': [
    { title: 'Prospecting Session',              description: 'Identify 3 potential clients or projects to pitch. Draft one short, genuine outreach message.',                  type: 'main',      duration: '20 min', xp: 90,  category: 'productivity', difficulty: 'medium' },
    { title: 'Sharpen Your Niche Statement',     description: 'Rewrite your freelance niche in one sentence: who you help, what you do, and the result they get.',             type: 'challenge', duration: '15 min', xp: 100, category: 'creative',     difficulty: 'medium' },
    { title: 'Client Follow-Up',                 description: 'Send a warm, thoughtful follow-up or check-in message to one current or past client.',                          type: 'habit',     duration: '10 min', xp: 60,  category: 'social',       difficulty: 'easy'   },
  ],
  'Entrepreneur': [
    { title: 'Customer Feedback Session',        description: 'Reach out to one customer and ask for 10 minutes of honest feedback on your product or service.',               type: 'challenge', duration: '20 min', xp: 120, category: 'social',       difficulty: 'hard'   },
    { title: 'Metric Review',                    description: 'Review your key metrics for the week. What is working? What needs to change? Make one concrete decision.',       type: 'main',      duration: '15 min', xp: 80,  category: 'productivity', difficulty: 'medium' },
    { title: 'Ship One Improvement',             description: 'Identify and ship one small but meaningful improvement to your product, process, or marketing today.',           type: 'main',      duration: '30 min', xp: 120, category: 'productivity', difficulty: 'hard'   },
  ],
  'Returning to Work': [
    { title: 'Rebuild Your Professional Bio',    description: 'Write or update a 3-sentence professional bio that reflects where you are and where you are heading.',          type: 'main',      duration: '15 min', xp: 70,  category: 'productivity', difficulty: 'medium' },
    { title: 'Refresh Industry Knowledge',       description: 'Spend 20 minutes reading about what has changed in your field while you were away.',                            type: 'main',      duration: '20 min', xp: 80,  category: 'learning',     difficulty: 'medium' },
    { title: 'Reconnect With a Former Colleague',description: 'Reach out to one person from your past professional network with a warm, genuine message.',                     type: 'challenge', duration: '10 min', xp: 90,  category: 'social',       difficulty: 'medium' },
  ],
  'Exploring Options': [
    { title: 'Options Mapping',                  description: 'Write 5 different paths your life or career could take. Rate each on excitement (1–10) and feasibility (1–10).', type: 'main',     duration: '20 min', xp: 80,  category: 'other',        difficulty: 'medium' },
    { title: 'Try One New Thing',                description: 'Do one thing you have never done before — a skill, genre, tool, or experience. Anything counts.',               type: 'habit',     duration: '20 min', xp: 70,  category: 'other',        difficulty: 'easy'   },
    { title: 'Talk to Someone You Admire',       description: 'Have a conversation with someone living or working in a way you find inspiring. Ask open questions.',           type: 'challenge', duration: '20 min', xp: 110, category: 'social',       difficulty: 'hard'   },
  ],
};

const STRUGGLE_QUESTS = {
  'Unclear Direction': [
    { title: 'Values Clarification',             description: 'List your top 5 personal values. For each, write why it matters and how it shows up (or does not) in your life.', type: 'main',    duration: '20 min', xp: 80,  category: 'other',        difficulty: 'medium' },
    { title: 'One-Year Vision Write',            description: 'Describe in detail what your ideal life looks like exactly one year from today. Be specific about every area.',  type: 'main',      duration: '20 min', xp: 90,  category: 'other',        difficulty: 'medium' },
    { title: '"What Would I Do For Free?" List', description: 'Write about 3 activities that absorb you so completely that time disappears. What do they have in common?',       type: 'habit',     duration: '10 min', xp: 50,  category: 'other',        difficulty: 'easy'   },
  ],
  'Lack of Motivation': [
    { title: 'Revisit Your Why',                 description: 'Write about why your main goal matters at a deep personal level. Connect it to your identity — not just outcomes.', type: 'habit',   duration: '10 min', xp: 60,  category: 'other',        difficulty: 'easy'   },
    { title: 'Minimum Viable Effort',            description: 'On a low-motivation day, do the smallest version of your key habit: 1 pushup, 1 sentence, 1 task. Just start.',  type: 'habit',     duration: '5 min',  xp: 60,  category: 'productivity', difficulty: 'easy'   },
    { title: 'Future Self Letter',               description: 'Write a letter from your future self (5 years ahead) explaining why you kept going during the hard days.',         type: 'challenge', duration: '15 min', xp: 100, category: 'other',        difficulty: 'medium' },
  ],
  'Financial Constraints': [
    { title: 'Free Skill Building',              description: 'Find one high-quality free resource — YouTube, library, free trial — and spend 20 minutes learning from it.',    type: 'habit',     duration: '20 min', xp: 60,  category: 'learning',     difficulty: 'easy'   },
    { title: 'Micro-Budget Audit',               description: 'Find one expense under $20/month you can cut without major impact. Cancel or downgrade it today.',               type: 'main',      duration: '10 min', xp: 80,  category: 'productivity', difficulty: 'easy'   },
    { title: 'Skill-to-Income Brainstorm',       description: 'List 3 skills you have right now that someone would pay for. Brainstorm the simplest way to start earning.',     type: 'challenge', duration: '15 min', xp: 100, category: 'other',        difficulty: 'medium' },
  ],
  'Time Management': [
    { title: 'Full-Day Time Audit',              description: 'Track exactly how you spend every hour today — no judgment, just honest tracking. Review at end of day.',        type: 'challenge', duration: 'All day', xp: 120, category: 'productivity', difficulty: 'hard'  },
    { title: 'Eliminate One Time Waster',        description: 'Identify one activity that drains your time without meaningful return. Reduce or eliminate it today.',           type: 'main',      duration: '10 min', xp: 80,  category: 'productivity', difficulty: 'medium' },
    { title: 'Plan Tomorrow Tonight',            description: 'Before bed, plan tomorrow\'s full schedule. Time-block every major activity.',                                    type: 'habit',     duration: '10 min', xp: 50,  category: 'productivity', difficulty: 'easy'   },
  ],
  'Skill Gaps': [
    { title: 'Gap Identification',               description: 'Research the most in-demand skills for your goal. Rate your current level in each from 1–5.',                   type: 'main',      duration: '20 min', xp: 80,  category: 'learning',     difficulty: 'medium' },
    { title: 'Close One Gap Today',              description: 'Pick your most important skill gap and spend 25 minutes actively working to close it.',                          type: 'main',      duration: '25 min', xp: 100, category: 'learning',     difficulty: 'hard'   },
    { title: 'Free Course Start',                description: 'Begin one free online resource — YouTube, freeCodeCamp, Khan Academy — targeting a skill gap you have.',        type: 'habit',     duration: '20 min', xp: 60,  category: 'learning',     difficulty: 'easy'   },
  ],
  'Imposter Syndrome': [
    { title: 'Evidence Journaling',              description: 'Write 5 specific times you demonstrated real competence in your field. Be as concrete as possible.',             type: 'habit',     duration: '10 min', xp: 60,  category: 'other',        difficulty: 'easy'   },
    { title: 'Imposter-to-Learner Reframe',      description: 'Write "I don\'t belong here" then rewrite it as "I am learning to belong here." List 3 steps to prove it.',    type: 'main',      duration: '10 min', xp: 70,  category: 'other',        difficulty: 'medium' },
    { title: 'Show Up Anyway',                   description: 'Do one thing today despite feeling unqualified — submit, post, apply, or share. Take the imperfect action.',    type: 'challenge', duration: '10 min', xp: 120, category: 'other',        difficulty: 'hard'   },
  ],
  'Burnout': [
    { title: 'Rest Without Guilt',               description: 'Take a real rest — a nap, sit outside, do nothing — for at least 30 minutes. No phone.',                       type: 'main',      duration: '30 min', xp: 80,  category: 'health',       difficulty: 'medium' },
    { title: 'Joy Inventory',                    description: 'List 5 things that brought you joy before you burned out. Plan to reintroduce one this week.',                  type: 'habit',     duration: '10 min', xp: 50,  category: 'health',       difficulty: 'easy'   },
    { title: 'Commitments Audit',                description: 'List every commitment you carry right now. Identify one you can delay, delegate, or drop completely.',           type: 'challenge', duration: '15 min', xp: 100, category: 'productivity', difficulty: 'medium' },
  ],
  'Decision Paralysis': [
    { title: '10/10/10 Framework',               description: 'For a decision you are stuck on: how will you feel about it in 10 minutes, 10 months, and 10 years?',           type: 'main',      duration: '10 min', xp: 80,  category: 'other',        difficulty: 'medium' },
    { title: 'Make One Small Decision Now',      description: 'Pick one small decision you have been postponing and decide within 5 minutes. Good enough beats perfect.',       type: 'challenge', duration: '5 min',  xp: 90,  category: 'productivity', difficulty: 'medium' },
    { title: 'Decision Journal Entry',           description: 'Write down one decision you need to make, the top 3 options, and what information would help you choose.',       type: 'habit',     duration: '10 min', xp: 60,  category: 'other',        difficulty: 'easy'   },
  ],
};

// Always-included foundation habits — one is picked every day
const UNIVERSAL_QUESTS = [
  { title: 'Morning Intention',    description: 'Write your top 3 priorities for today before doing anything else. Keep the list visible all day.',               type: 'habit', duration: '5 min', xp: 30, category: 'productivity', difficulty: 'easy' },
  { title: 'Gratitude Check-In',  description: 'Write 3 specific things you are grateful for today. Go beyond "health and family" — be detailed.',               type: 'habit', duration: '5 min', xp: 30, category: 'other',        difficulty: 'easy' },
  { title: 'Evening Reflection',  description: 'Write 3 sentences: what went well today, what you learned, and one thing to do differently tomorrow.',           type: 'habit', duration: '5 min', xp: 30, category: 'other',        difficulty: 'easy' },
  { title: 'Hydrate & Move',      description: 'Drink 2 glasses of water and take a 5-minute walk before settling into your first task.',                       type: 'habit', duration: '10 min',xp: 30, category: 'health',        difficulty: 'easy' },
];

// ─── ENGINE ───────────────────────────────────────────────────────────────────

function pickRandom(arr, n) {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

function collectPool(profile) {
  const pool = [];
  const { goals = [], interests = [], strengths = [], weaknesses = [], currentSituation = '', struggles = [] } = profile;

  for (const g of goals)     if (GOAL_QUESTS[g])      pool.push(...GOAL_QUESTS[g]);
  for (const i of interests) if (INTEREST_QUESTS[i])  pool.push(...INTEREST_QUESTS[i]);
  for (const s of strengths) if (STRENGTH_QUESTS[s])  pool.push(...STRENGTH_QUESTS[s]);
  for (const w of weaknesses)if (WEAKNESS_QUESTS[w])  pool.push(...WEAKNESS_QUESTS[w]);
  if (currentSituation && SITUATION_QUESTS[currentSituation]) pool.push(...SITUATION_QUESTS[currentSituation]);
  for (const s of struggles) if (STRUGGLE_QUESTS[s])  pool.push(...STRUGGLE_QUESTS[s]);

  return pool;
}

/**
 * Build a balanced day:
 *   1 universal foundation habit  (always)
 *   2 main quests                 (from goals / situation)
 *   1 habit quest                 (from weaknesses / struggles)
 *   1 optional challenge          (harder bonus quest)
 */
export function generateDailyQuests(profile) {
  const pool      = collectPool(profile);
  const mains     = pool.filter(q => q.type === 'main');
  const habits    = pool.filter(q => q.type === 'habit');
  const challenges= pool.filter(q => q.type === 'challenge');

  const result = [];

  // 1 foundation
  result.push({ ...pickRandom(UNIVERSAL_QUESTS, 1)[0], optional: false });

  // 2 mains (fall back to universals if profile pool is empty)
  const chosenMains = pickRandom(mains.length >= 2 ? mains : UNIVERSAL_QUESTS, 2);
  chosenMains.forEach(q => result.push({ ...q, optional: false }));

  // 1 habit
  const chosenHabits = pickRandom(habits.length >= 1 ? habits : UNIVERSAL_QUESTS, 1);
  chosenHabits.forEach(q => result.push({ ...q, optional: false }));

  // 1 optional challenge
  if (challenges.length > 0) {
    result.push({ ...pickRandom(challenges, 1)[0], optional: true });
  }

  // Deduplicate by title
  const seen = new Set();
  return result.filter(q => { if (seen.has(q.title)) return false; seen.add(q.title); return true; });
}
