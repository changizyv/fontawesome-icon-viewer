<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8">
    <title>FontAwesome Icon Browser</title>
    <link rel="stylesheet" href="assets/css/fontawesome.min.css">
    <link rel="stylesheet" href="assets/css/solid.min.css">
    <link rel="stylesheet" href="assets/css/regular.min.css">
    <link rel="stylesheet" href="assets/css/brands.min.css">
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
    <header>
        <div class="search-wrapper">
            <input type="text" id="search" placeholder="Search icon... (e.g. user, heart, trash)" autocomplete="off">
        </div>
        <select id="iconType">
            <option value="far" selected>Regular</option>
            <option value="fas">Solid</option>
        </select>
        <div class="stats" id="stats"></div>
    </header>
    <div id="grid" class="grid">
        <div class="loading">Loading icons...</div>
    </div>
    <div id="copyToast" class="copy-toast">Copied!</div>

    <script>
        const iconsList = <?php
            $cssFile = __DIR__ . '/assets/css/fontawesome.min.css';
            
            if (!file_exists($cssFile)) {
                echo '[]';
                die();
            }
            
            $cssContent = file_get_contents($cssFile);
            $allIcons = [];
            
            preg_match_all('/\.fa-([a-z0-9-]+):before\s*\{\s*content:\s*"\\\\([0-9a-f]+)"/i', $cssContent, $matches);
            
            for ($i = 0; $i < count($matches[0]); $i++) {
                $className = $matches[1][$i];
                
                if (is_numeric($className) || strlen($className) < 2) {
                    continue;
                }
                
                if (!in_array($className, $allIcons)) {
                    $allIcons[] = $className;
                }
            }
            
            sort($allIcons);
            echo json_encode($allIcons);
        ?>;
        
        console.log('Total icons:', iconsList.length);
    </script>

    <script src="assets/js/main.js"></script>
    <script src="assets/js/script.js"></script>
</body>
</html>
