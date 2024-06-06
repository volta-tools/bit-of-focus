
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>A Bit of Focus - About</title>
    <link rel="stylesheet" href="/assets/css/dark.css">
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
        <p><?php echo date('Y m d') ?></p>
    </header>

    <main>
        <random-quote/>
    </main>

    <footer>
        &copy; copyright 2024
    </footer>

    <script type="module">
        import  RandomQuote from "/assets/js/RandomQuote.mjs";
        customElements.define("random-quote", RandomQuote, { extends: "blockquote" });
    </script>

</body>
</html>
