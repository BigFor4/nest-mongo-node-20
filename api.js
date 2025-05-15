const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// In-memory store thay cho context.global
const store = {
    ips: {},
    screens: {},
    sessions: {},
    currentOperations: {},
    tagmap: {},
    eventlog: [],
};

// --------- IP APIs ---------
app.get('/getIp', (req, res) => {
    const id = req.query.id;
    if (id && store.ips[id]) {
        res.json({ ip: store.ips[id] });
    } else {
        res.json({ ip: "0.0.0.0" });
    }
});

app.get('/addIp', (req, res) => {
    const { id, ip } = req.query;
    if (id && ip) store.ips[id] = ip;
    res.json({ status: 'ok' });
});

app.get('/listIps', (req, res) => {
    res.json(store.ips);
});

app.get('/clearIps', (req, res) => {
    store.ips = {};
    res.json({ status: 'cleared' });
});

// --------- SCREEN APIs ---------
app.get('/page', (req, res) => {
    const id = req.query.id;
    if (store.screens[id]) {
        res.json(store.screens[id]);
    } else {
        res.json({ "0": { url: "https://msb.eastus.cloudapp.azure.com:1880", state: "normal", tab: 0 } });
    }
});

app.get('/setPage', (req, res) => {
    const { id, url, state = "normal", tab = 0 } = req.query;
    if (!store.screens[id]) store.screens[id] = {};
    if (id && url) {
        store.screens[id][tab] = { url, state, tab };
    }
    res.json({ status: 'ok' });
});

app.get('/clearScreens', (req, res) => {
    store.screens = {};
    res.json({ status: 'cleared' });
});

app.get('/listScreens', (req, res) => {
    res.json(store.screens);
});

// --------- OPERATION APIs ---------
app.post('/start', (req, res) => {
    const { id, state, surgeon, operation } = req.body;
    let current;
    if (state === "start") {
        current = { room: id, tags: {}, startTime: Date.now(), elapsed: 0, surgeon, operation };
        store.currentOperations[id] = current;
    } else if (state === "watch") {
        current = store.currentOperations[id];
    } else if (state === "cancel") {
        current = store.currentOperations[id];
        delete store.currentOperations[id];
    }
    if (!current) current = { room: id, tags: {} };
    current.msgtype = state;
    res.json([current]);
});

app.post('/stop', (req, res) => {
    const { id } = req.body;
    const current = store.currentOperations[id];
    if (current) {
        delete store.currentOperations[id];
        current.msgtype = "stopped";
        res.json([current]);
    } else {
        res.json([]);
    }
});

app.get('/current', (req, res) => {
    const id = req.query.id;
    const current = store.currentOperations[id];
    res.json(current ? [current] : []);
});

app.get('/history', (req, res) => {
    // Giả lập truy vấn lịch sử, thực tế nên truy vấn DB
    res.json({ message: "Implement DB query for history" });
});

// --------- TABLE APIs ---------
app.get('/tables', (req, res) => {
    // Giả lập, thực tế nên truy vấn DB
    res.json({ message: "Implement DB query for tables" });
});

app.get('/delTable', (req, res) => {
    const { uuid } = req.query;
    // Giả lập xóa, thực tế nên thao tác DB
    res.json({ status: 'deleted', uuid });
});

// --------- LOG APIs ---------
app.get('/log', (req, res) => {
    res.send(store.eventlog.join('\n'));
});

app.get('/clearLog', (req, res) => {
    store.eventlog = [];
    res.json({ status: 'cleared' });
});

// --------- TOKEN APIs ---------
app.get('/jwt', (req, res) => {
    const { token } = req.query;
    // Giả lập kiểm tra token
    res.json({ valid: !!token });
});

// --------- PORT ---------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
});