import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './enhancements.css';
import { estimateMilestoneWindow, scoreForm } from './services/mockServices';

const Icon = ({ name, size = 22, stroke = 2, className = '' }) => {
  const paths = {
    home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z"/><path d="M9 21v-7h6v7"/></>,
    activity: <><path d="M3 12h4l2.3-7 4.2 14L16 12h5"/></>,
    chart: <><path d="M4 19V5"/><path d="M4 19h17"/><path d="m7 15 4-4 3 2 5-6"/></>,
    spark: <><path d="m12 3-1.5 5.5L5 10l5.5 1.5L12 17l1.5-5.5L19 10l-5.5-1.5Z"/><path d="m19 16-.7 2.3L16 19l2.3.7L19 22l.7-2.3L22 19l-2.3-.7Z"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c.8-4 3.4-6 8-6s7.2 2 8 6"/></>,
    bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    target: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/></>,
    fire: <path d="M12 22c4 0 7-2.5 7-6.5 0-3.1-2-5.1-4.3-7.6.1 2.6-1 3.8-2.3 4.6.1-3.3-1.4-5.5-3.4-7.6.1 4.4-5 6.2-5 10.8C4 19.4 7.1 22 12 22Z"/>,
    check: <path d="m5 12 4.2 4L19 6"/>,
    play: <path d="m8 5 10 7-10 7Z" fill="currentColor" stroke="none"/>,
    camera: <><path d="M4 8h4l1.2-2h5.6L16 8h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z"/><circle cx="12" cy="14" r="3"/></>,
    info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    note: <><path d="M6 3h9l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"/><path d="M14 3v5h5M8 13h8M8 17h5"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>
  };
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
};

const exercises = [
  { id: 1, name: 'Knee flexion', category: 'Mobility', duration: '8 min', level: 'Gentle', reps: '3 × 12', done: true, accent: 'orange' },
  { id: 2, name: 'Supported squats', category: 'Strength', duration: '10 min', level: 'Steady', reps: '3 × 8', done: true, accent: 'green' },
  { id: 3, name: 'Single-leg balance', category: 'Balance', duration: '6 min', level: 'Focus', reps: '2 × 30 sec', done: false, accent: 'blue' },
  { id: 4, name: 'Heel raises', category: 'Strength', duration: '6 min', level: 'Steady', reps: '3 × 10', done: false, accent: 'purple' },
  { id: 5, name: 'Hip opener', category: 'Mobility', duration: '5 min', level: 'Gentle', reps: '2 × 10', done: false, accent: 'orange' },
];

const milestones = [
  { title: 'Walk 100m independently', timing: '3–5 weeks', progress: 72, status: 'On track' },
  { title: 'Climb one flight of stairs', timing: '5–8 weeks', progress: 43, status: 'Building strength' },
  { title: 'Return to college / work', timing: '7–11 weeks', progress: 18, status: 'In your sights' },
];

const ProgressRing = ({ value, size = 112, stroke = 10, children, tone = 'lime' }) => {
  const radius = (size - stroke) / 2, circumference = 2 * Math.PI * radius;
  return <div className="progress-ring" style={{ width: size, height: size }}>
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle className="ring-track" cx={size / 2} cy={size / 2} r={radius} strokeWidth={stroke}/>
      <circle className={`ring-value ${tone}`} cx={size / 2} cy={size / 2} r={radius} strokeWidth={stroke} strokeDasharray={circumference} strokeDashoffset={circumference * (1 - value / 100)} />
    </svg>
    <div className="ring-label">{children}</div>
  </div>;
};

const LineChart = ({ variant = 'recovery' }) => {
  const points = variant === 'rom' ? '2,75 30,69 57,64 85,58 113,50 141,43 169,35 198,28' : variant === 'form' ? '2,77 30,70 57,63 85,56 113,48 141,43 169,35 198,27' : '2,80 26,76 48,72 72,68 96,59 120,53 146,38 170,33 198,18';
  return <svg className="line-chart" viewBox="0 0 200 96" preserveAspectRatio="none" role="img" aria-label={`${variant} trend chart`}>
    <defs><linearGradient id={`fill-${variant}`} x1="0" x2="0" y1="0" y2="1"><stop stopColor="#a8dc43" stopOpacity=".32"/><stop offset="1" stopColor="#a8dc43" stopOpacity="0"/></linearGradient></defs>
    <path d={`M${points} L198,96 L2,96 Z`} fill={`url(#fill-${variant})`}/>
    <polyline points={points} fill="none" stroke="#a8dc43" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    {variant === 'recovery' && <circle cx="198" cy="18" r="4.5" fill="#fff" stroke="#a8dc43" strokeWidth="3"/>}
  </svg>;
};

const roadmapStages = [
  { number: '01', title: 'Regain movement', detail: 'Restore comfortable range of motion and everyday confidence.', metric: '72%', status: 'Active now', color: 'mint' },
  { number: '02', title: 'Build strength', detail: 'Develop stability and control for the things you love doing.', metric: '43%', status: 'Up next', color: 'blue' },
  { number: '03', title: 'Functional recovery', detail: 'Turn your strength into a confident return to campus and life.', metric: '18%', status: 'On the horizon', color: 'purple' },
];

function Dashboard({ completed, onTab, openNotifications, profileName }) {
  const dailyPercent = Math.round((completed / 15) * 100);
  const index = Math.min(88, 52 + completed);
  const [medicalOpen, setMedicalOpen] = useState(false);
  const [stage, setStage] = useState(0);
  const activeStage = roadmapStages[stage];
  return <>
    <header className="topbar">
      <div><p className="eyebrow">YOUR RECOVERY DASHBOARD</p><h1>Welcome, {profileName}! <span className="wave">👋</span></h1><p className="subtle">Keep going. Every step counts.</p><small className="subtle">Demo data only • No patient records are connected</small></div>
      <button className="icon-button" aria-label="Open notifications" onClick={openNotifications}><Icon name="bell"/><span className="notification-dot"/></button>
    </header>

    <button className="records-card" onClick={() => setMedicalOpen(true)} aria-label="View sample recovery summary">
      <span className="record-orb"><Icon name="note" size={20}/></span><span className="record-copy"><span className="label">SAMPLE RECOVERY SUMMARY</span><strong>Personalized recovery plan</strong><small>Progress overview ready to review</small></span><span className="record-arrow"><Icon name="chevron" size={18}/></span>
    </button>

    <section className="goal-card">
      <div className="goal-icon"><Icon name="target" size={25}/></div>
      <div className="goal-copy"><span className="label">YOUR PRIMARY GOAL</span><h2>Move with confidence</h2><p><span className="dot lime-dot"/> Progress at your own pace</p></div>
      <button className="round-arrow" aria-label="View goal"><Icon name="chevron" size={19}/></button>
    </section>

    <section className="section-heading"><div><span className="label">TODAY'S PROGRESS</span><h2>Small moves, big impact.</h2></div><button className="text-button" onClick={() => onTab('exercises')}>View routine <Icon name="chevron" size={16}/></button></section>
    <section className="progress-card">
      <div className="progress-top"><div className="exercise-count"><span>{completed}</span> / 15 <small>Exercises completed</small></div><strong>{dailyPercent}%</strong></div>
      <div className="progress-bar" aria-label={`${dailyPercent}% completed`}><span style={{width: `${dailyPercent}%`}}/></div>
      <div className="metrics-grid">
        <Metric icon="activity" value="+3°" label="Range of motion" tone="mint"/>
        <Metric icon="spark" value="+6%" label="Movement control" tone="lilac"/>
        <Metric icon="target" value="82%" label="Form score" tone="peach"/>
      </div>
    </section>

    <section className="recovery-card">
      <div className="recovery-score"><ProgressRing value={index}><b>{index}</b><span>/ 100</span></ProgressRing><p>RECOVERY INDEX</p></div>
      <div className="recovery-copy"><h2>Your recovery is<br/><em>moving forward.</em></h2><p>You are <b>72% of the way</b> toward your current mobility milestone.</p><div className="mini-chart"><LineChart/><div><span>Last 30 days</span><b>+12 points</b></div></div></div>
    </section>

    <section className="section-heading roadmap-heading"><div><span className="label">YOUR RECOVERY ROADMAP</span><h2>One phase at a time.</h2></div><button className="text-button" onClick={() => onTab('progress')}>See forecast <Icon name="chevron" size={16}/></button></section>
    <section className="roadmap-carousel" aria-label="Recovery roadmap carousel">
      <div className={`roadmap-slide ${activeStage.color}`} key={stage}><span className="stage-number">{activeStage.number}</span><span className="stage-status">{activeStage.status}</span><h3>{activeStage.title}</h3><p>{activeStage.detail}</p><div className="stage-metric"><span>STAGE PROGRESS</span><b>{activeStage.metric}</b><i><em style={{ width: activeStage.metric }}/></i></div></div>
      <div className="roadmap-controls"><button aria-label="Previous roadmap stage" disabled={stage === 0} onClick={() => setStage(value => value - 1)}><Icon name="arrow" size={18} className="arrow-left"/></button><div className="roadmap-dots">{roadmapStages.map((item, i) => <button key={item.number} aria-label={`View ${item.title}`} className={i === stage ? 'active' : ''} onClick={() => setStage(i)}/>)}</div><button aria-label="Next roadmap stage" disabled={stage === roadmapStages.length - 1} onClick={() => setStage(value => value + 1)}><Icon name="arrow" size={18}/></button></div>
    </section>
    {medicalOpen && <MedicalModal onClose={() => setMedicalOpen(false)}/>} 
  </>;
}

function Metric({ icon, value, label, tone }) { return <div className="metric"><span className={`metric-icon ${tone}`}><Icon name={icon} size={18}/></span><b>{value}</b><small>{label}</small></div>; }
function MedicalModal({ onClose }) { return <div className="modal-backdrop"><section className="medical-modal modal-sheet" role="dialog" aria-modal="true" aria-label="Sample recovery summary"><button className="modal-close" onClick={onClose} aria-label="Close recovery summary"><Icon name="close"/></button><span className="label">SAMPLE SUMMARY</span><h2>Your recovery plan</h2><div className="record-detail"><span>PROGRAM</span><b>Personalized movement and strength plan</b><small>Example content for this app preview</small></div><div className="record-detail"><span>PROGRESS</span><b>Track activity and milestones</b><small>Sample values are shown throughout this demo</small></div><div className="record-detail"><span>SUPPORT</span><b>Stay connected with your care team</b><small>No real patient or clinician records are connected</small></div><button className="primary-button full" onClick={onClose}>Close summary</button></section></div>; }

function Exercises({ completedItems, toggleExercise }) {
  const [active, setActive] = useState(null);
  const [camera, setCamera] = useState(false);
  const [rep, setRep] = useState(7);
  const formScore = scoreForm(rep);
  const completed = completedItems.size;
  return <>
    <header className="page-header"><span className="eyebrow">YOUR DAILY ROUTINE</span><h1>Move with confidence.</h1><p className="subtle">Your plan adapts as you get stronger.</p></header>
    <section className="routine-summary"><div><span className="label">TODAY'S SESSION</span><h2>{completed} of {exercises.length} completed</h2><p>30 minutes planned • 3 focus areas</p></div><ProgressRing value={completed / exercises.length * 100} size={74} stroke={7}><b>{Math.round(completed / exercises.length * 100)}%</b></ProgressRing></section>
    <div className="category-row"><button className="chip selected">All exercises</button><button className="chip">Mobility</button><button className="chip">Strength</button><button className="chip">Balance</button></div>
    <section className="exercise-list" aria-label="Exercises">
      {exercises.map((exercise) => <article className={`exercise-item ${completedItems.has(exercise.id) ? 'complete' : ''}`} key={exercise.id}>
        <button className={`exercise-badge ${exercise.accent}`} aria-label={`Start ${exercise.name}`} onClick={() => { setActive(exercise); setCamera(true); }}><Icon name="play" size={16}/></button>
        <button className="exercise-main" onClick={() => setActive(exercise)}><span className="label">{exercise.category}</span><h3>{exercise.name}</h3><p>{exercise.reps} <i/> {exercise.duration} <i/> {exercise.level}</p></button>
        <button className={`check-button ${completedItems.has(exercise.id) ? 'checked' : ''}`} aria-label={`Mark ${exercise.name} complete`} onClick={() => toggleExercise(exercise.id)}>{completedItems.has(exercise.id) && <Icon name="check" size={17}/>}</button>
      </article>)}
    </section>
    {active && !camera && <ExerciseDetail exercise={active} onClose={() => setActive(null)} onStart={() => setCamera(true)} />}
    {camera && <CameraModal exercise={active} rep={rep} formScore={formScore} onRep={() => setRep(r => r + 1)} onClose={() => {setCamera(false); setActive(null);}} />}
  </>;
}

function ExerciseDetail({ exercise, onClose, onStart }) { return <div className="modal-backdrop"><section className="detail-modal modal-sheet" role="dialog" aria-modal="true" aria-label={exercise.name}><button className="modal-close" aria-label="Close exercise details" onClick={onClose}><Icon name="close"/></button><div className={`detail-hero ${exercise.accent}`}><Icon name="activity" size={42}/></div><span className="label">{exercise.category} • {exercise.level}</span><h2>{exercise.name}</h2><p>Take this at a controlled pace. Good form matters more than speed today.</p><div className="detail-stats"><span><b>{exercise.reps}</b>Recommended</span><span><b>{exercise.duration}</b>Duration</span><span><b>82%</b>Last form score</span></div><button className="primary-button full" onClick={onStart}><Icon name="camera" size={19}/> Start AI guided session</button></section></div>; }

function CameraModal({ exercise, rep, formScore, onRep, onClose }) { return <div className="modal-backdrop"><section className="camera-modal" role="dialog" aria-modal="true" aria-label="AI form tracking"><div className="camera-head"><button className="camera-close" onClick={onClose} aria-label="End session"><Icon name="close"/></button><div><span className="live-dot"/> LIVE FORM TRACKING</div><span>01:42</span></div><div className="camera-view"><div className="camera-grid"/><div className="pose"><i className="pose-head"/><i className="pose-arm left"/><i className="pose-arm right"/><i className="pose-body"/><i className="pose-leg left"/><i className="pose-leg right"/><span className="joint j1"/><span className="joint j2"/><span className="joint j3"/><span className="joint j4"/><span className="joint j5"/></div><div className="camera-tip"><Icon name="spark" size={18}/><span>{formScore >= 90 ? 'Great form! Keep this rhythm.' : 'Keep your knee aligned with your toes.'}</span></div></div><div className="camera-metrics"><div><span>REPS</span><b>{rep}<small> / 12</small></b></div><div><span>FORM SCORE</span><b className="bright">{formScore}%</b></div><div><span>PACING</span><b>Steady</b></div></div><button className="rep-button" onClick={onRep}><span>Tap after each rep</span><b>+ Add rep</b></button></section></div>; }

function Progress({ completed }) {
  const completion = Math.round(completed / exercises.length * 100);
  return <>
    <header className="page-header"><span className="eyebrow">RECOVERY FORECAST</span><h1>A clearer view ahead.</h1><p className="subtle">Your plan adjusts with your progress.</p></header>
    <section className="forecast-card"><div className="forecast-top"><div><span className="label">PROJECTED PATH</span><h2>On track for your goal</h2></div><span className="on-track"><Icon name="check" size={13}/> On track</span></div><p>Based on your recent consistency and movement quality.</p><div className="forecast-stat"><b>{estimateMilestoneWindow(Math.max(completion, 60))}</b><span>to walk 100m independently</span></div></section>
    <section className="milestone-list"><h2>Estimated milestones</h2>{milestones.map((item, i) => <article className="milestone" key={item.title}><div className={`milestone-number m${i+1}`}>{i+1}</div><div className="milestone-content"><div><h3>{item.title}</h3><span>{item.timing}</span></div><div className="thin-progress"><i style={{width: `${Math.min(100, item.progress + (i === 0 ? Math.floor(completed/3) : 0))}%`}}/></div><p>{item.status}</p></div></article>)}</section>
    <section className="analytics"><div className="section-heading tight"><div><span className="label">YOUR TRENDS</span><h2>Proof of progress.</h2></div></div><article className="analytics-card"><div className="chart-head"><div><span>RANGE OF MOTION</span><b>+18° <em>this month</em></b></div><span className="chart-badge">Improving</span></div><LineChart variant="rom"/><div className="chart-labels"><span>Oct 1</span><span>Oct 31</span></div></article><article className="analytics-card"><div className="chart-head"><div><span>FORM SCORE</span><b>82% <em>+9% this month</em></b></div><span className="chart-badge">Strong</span></div><LineChart variant="form"/><div className="chart-labels"><span>Oct 1</span><span>Oct 31</span></div></article></section>
  </>;
}

function Insights({ onTab, onMessage }) { return <>
  <header className="page-header"><span className="eyebrow">CARE TEAM</span><h1>You have support.</h1><p className="subtle">Stay connected to your rehabilitation team.</p></header>
  <section className="therapist-card"><div className="therapist-avatar">CT</div><div><span className="label">YOUR CARE TEAM</span><h2>Recovery support</h2><p>Connect with your care team for guidance.</p></div><button className="round-arrow" aria-label="Contact care team"><Icon name="chevron"/></button></section>
  <section className="note-card"><div className="note-title"><span className="note-icon"><Icon name="note" size={19}/></span><div><span className="label">SAMPLE PLAN NOTE</span><h2>Progress update</h2></div></div><blockquote>Your activity is building steadily. Keep your movements controlled and follow the plan that is right for you.</blockquote><button className="text-button">View plan <Icon name="chevron" size={16}/></button></section>
  <section className="alerts-section"><span className="label">PLAN UPDATES</span><article className="alert-card"><span className="alert-icon"><Icon name="spark" size={20}/></span><div><h3>Your plan was adjusted</h3><p>Two balance exercises were added based on your latest session.</p><button onClick={() => onTab('exercises')}>View updated routine <Icon name="arrow" size={16}/></button></div></article><article className="alert-card calm"><span className="alert-icon"><Icon name="activity" size={20}/></span><div><h3>Consistency is paying off</h3><p>You completed 5 sessions this week — your best streak yet.</p></div></article></section>
  <button className="primary-button full message-button" onClick={onMessage}>Message care team</button>
  </>;
}

function Profile({ profileName, openSettings }) { return <><header className="page-header profile-head"><div className="profile-avatar">{profileName.slice(0, 1).toUpperCase()}</div><div><span className="eyebrow">YOUR SPACE</span><h1>{profileName}</h1><p className="subtle">Recovery since 4 October</p></div></header><section className="profile-index"><ProgressRing value={64} size={96}><b>64</b><span>/100</span></ProgressRing><div><span className="label">RECOVERY INDEX</span><h2>You’re doing brilliantly.</h2><p>12 points gained in the last 30 days.</p></div></section><section className="settings-list"><button><span><Icon name="target"/> Recovery goals</span><Icon name="chevron"/></button><button><span><Icon name="calendar"/> Recovery schedule</span><Icon name="chevron"/></button><button><span><Icon name="bell"/> Notifications</span><Icon name="chevron"/></button><button onClick={openSettings}><span><Icon name="user"/> Personal details</span><Icon name="chevron"/></button></section><p className="app-version">RECLAIM • Recover. Rebuild. Reclaim Life. • v1.0</p></>; }

function App() {
  const [tab, setTab] = useState('home');
  const [completedItems, setCompletedItems] = useState(new Set([1, 2]));
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Therapist note added', body: 'Keep your knee straight during leg raises.', time: '20 min ago' },
    { id: 2, title: 'Afternoon reminder', body: 'Mobility test due at 4:00 PM.', time: '1 hr ago' },
  ]);
  const [profileName, setProfileName] = useState('Rahul');
  const [profileEditor, setProfileEditor] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [toast, setToast] = useState('');
  const toggleExercise = (id) => { setCompletedItems(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); setToast(next.has(id) ? 'Exercise marked complete — great work!' : 'Exercise moved back to your routine.'); setTimeout(() => setToast(''), 2600); return next; }); };
  const completed = 10 + completedItems.size;
  const content = { home: <Dashboard completed={completed} onTab={setTab} profileName={profileName} openNotifications={() => setNotificationsOpen(true)}/>, exercises: <Exercises completedItems={completedItems} toggleExercise={toggleExercise}/>, progress: <Progress completed={completedItems.size}/>, insights: <Insights onTab={setTab} onMessage={() => setMessageOpen(true)}/>, profile: <Profile profileName={profileName} openSettings={() => setProfileEditor(true)} /> };
  return <main className="app-shell"><div className="ambient ambient-one"/><div className="ambient ambient-two"/><div className="app-content">{content[tab]}</div><nav className="bottom-nav" aria-label="Main navigation">{[['home','home','Home'],['exercises','activity','Exercises'],['progress','chart','Progress'],['insights','spark','Insights'],['profile','user','Profile']].map(([key, icon, label]) => <button className={tab === key ? 'active' : ''} key={key} onClick={() => setTab(key)} aria-current={tab === key ? 'page' : undefined}><Icon name={icon} size={21}/><span>{label}</span></button>)}</nav>{notificationsOpen && <NotificationsModal notifications={notifications} onClose={() => setNotificationsOpen(false)} onRead={() => setNotifications([])} onRoutine={() => { setNotificationsOpen(false); setTab('exercises'); }}/>} {profileEditor && <ProfileModal profileName={profileName} onClose={() => setProfileEditor(false)} onSave={(name) => { setProfileName(name); setProfileEditor(false); setToast('Profile name updated.'); }}/>} {messageOpen && <MessageModal onClose={() => setMessageOpen(false)} onSend={() => { setMessageOpen(false); setToast('Demo only: no message was sent.'); }}/>} {toast && <div className="toast"><Icon name="check" size={18}/>{toast}</div>}</main>;
}

function NotificationsModal({ notifications, onClose, onRead, onRoutine }) { return <div className="modal-backdrop"><section className="notification-panel modal-sheet" role="dialog" aria-modal="true" aria-label="Notifications"><button className="modal-close" onClick={onClose} aria-label="Close notifications"><Icon name="close"/></button><span className="label">NOTIFICATIONS</span>{notifications.length ? <><div className="notification-title"><h2>{notifications.length} new updates</h2><button onClick={onRead}>Mark all as read</button></div><div className="notification-list">{notifications.map((item) => <article key={item.id}><span><Icon name={item.id === 1 ? 'note' : 'calendar'} size={18}/></span><div><h3>{item.title}</h3><p>{item.body}</p><small>{item.time}</small></div></article>)}</div><button className="primary-button full" onClick={onRoutine}>View today’s routine</button></> : <div className="clear-notifications"><div><Icon name="check" size={26}/></div><h2>You’re all caught up!</h2><p>Your recovery plan is right on track. We’ll let you know when there’s something new.</p><button className="primary-button full" onClick={onRoutine}>View today’s routine</button></div>}</section></div>; }
function ProfileModal({ profileName, onClose, onSave }) { const [draft, setDraft] = useState(profileName); return <div className="modal-backdrop"><section className="profile-modal modal-sheet" role="dialog" aria-modal="true" aria-label="Edit personal details"><button className="modal-close" onClick={onClose} aria-label="Close profile editor"><Icon name="close"/></button><span className="label">PERSONAL DETAILS</span><h2>What should we call you?</h2><p>Your name personalizes the recovery experience.</p><label>Display name<input value={draft} maxLength="22" onChange={(event) => setDraft(event.target.value)} autoFocus/></label><button className="primary-button full" disabled={!draft.trim()} onClick={() => onSave(draft.trim())}>Save name</button></section></div>; }
function MessageModal({ onClose, onSend }) { const [message, setMessage] = useState(''); return <div className="modal-backdrop"><section className="message-modal modal-sheet" role="dialog" aria-modal="true" aria-label="Message care team"><button className="modal-close" onClick={onClose} aria-label="Close message composer"><Icon name="close"/></button><span className="label">CARE TEAM</span><h2>Message your care team</h2><p>This demo does not send messages.</p><textarea aria-label="Message for care team" placeholder="Write a message…" value={message} onChange={(event) => setMessage(event.target.value)}/><button className="primary-button full" disabled={!message.trim()} onClick={onSend}>Preview demo action <Icon name="arrow" size={17}/></button></section></div>; }

createRoot(document.getElementById('root')).render(<App />);
