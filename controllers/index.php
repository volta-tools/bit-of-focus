<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>A Bit of Focus</title>
    <link rel="stylesheet" href="/assets/css/dark.css">
    <link rel="manifest" href="/manifest.json" />
    <link rel="icon" type="image/png" sizes="32x32" href="/images/icon-32x32.png">
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">

    <!-- ios support -->
    <link rel="apple-touch-icon" href="/assets/images/icon-32x32.png" />
    <link rel="apple-touch-icon" href="/images/icon-72x72.png" />
    <link rel="apple-touch-icon" href="/images/icon-96x96.png" />
    <link rel="apple-touch-icon" href="/images/icon-128x128.png" />
    <link rel="apple-touch-icon" href="/images/icon-144x144.png" />
    <link rel="apple-touch-icon" href="/images/icon-152x152.png" />
    <link rel="apple-touch-icon" href="/images/icon-192x192.png" />
    <link rel="apple-touch-icon" href="/images/icon-512x512.png" />

    <meta name="apple-mobile-web-app-status-bar" content="#ffaa00" />
    <meta name="theme-color" content="#ffaa00" />

</head>
<body>

    <header>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li>About</li>
            </ul>
        </nav>
        <h1><img src="/assets//images/icon-32x32.png" alt="logo"> A Bit of Focus</h1>
        <p>Wednesday 2024.03.20</p>
    </header>

    <main>
        <div id="timer"></div>
        <div id="timerMessage"></div>
    </main>

    <footer>
        &copy; copyright 2024
    </footer>

    <script src="/assets/js/app.js"></script>
    <script type="module">
        import  BitTimer from "/assets/js/BitTimer.mjs";
        fetch('/api/v1/config').then((result) => {
            result.json().then((config) => {
                console.debug( config );
                const CLOCK = new BitTimer(config);
                CLOCK.start();
            }).catch(error => {
                console.debug("Parsing error", error);
            });
        }).catch(error => {
            console.debug("Failed to fetch", error);
        });
    </script>

</body>
</html>