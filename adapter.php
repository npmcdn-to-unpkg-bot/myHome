<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <title>adapter</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="static/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="static/css/bootstrap-responsive.min.css" rel="stylesheet"/>
    <link rel="stylesheet" type="text/css" href="static/css/style.css">

    <script src="static/script/html5.js"></script>
    <![endif]-->
    <!--[if IE 6]>
    <link href="static/css/ie6.min.css" rel="stylesheet">
    <![endif]-->

    <script type="text/javascript" src="static/script/jquery-latest.min.js"></script>

    <style>
        body { padding: 0px; }
    </style>


</head>
<body>

<script type="text/javascript" src="static/script/flow.js"></script>
<script type="text/javascript" src="static/script/home.js"></script>

<!--<script src="https://www.gstatic.com/firebasejs/3.0.2/firebase.js"></script>-->
<script type="text/javascript" src="static/script/firebase.js"></script>
<script type="text/javascript" src="static/script/user.js"></script>
<script type="text/javascript" src="static/script/regist.js"></script>
<script type = "text/javascript">
    vee.firebase = firebase.initializeApp({
        apiKey: "AIzaSyD34SbBSlAZQ85rcNtbYTGm5w3MHnrK8k4",
        authDomain: "yop-dev.firebaseapp.com",
        databaseURL: "https://yop-dev.firebaseio.com",
        storageBucket: "yop-dev.appspot.com",
    });
</script>
<script type="text/javascript" src="static/script/bootstrap.min.js"></script>

<!--[if IE 6]>
<script src="static/script/ie6.min.js"></script>
<![endif]-->
<script type="text/javascript" src="static/script/adapter.js"></script>


<script type="text/javascript">
    $(document).ready(function () {
//        alert("hello world");
//        openPay(5);
//		window.localStorage.

        checkAdapterParame();
    });
</script>

</body>
</html>