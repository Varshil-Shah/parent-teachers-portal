<?php
    session_start();
    date_default_timezone_set('Asia/Kolkata');
    include_once './config.php';
    $title = mysqli_real_escape_string($con, $_POST['title']);
    $message = mysqli_real_escape_string($con, $_POST['message']);
    $uniqueId = $_SESSION['uniqueId'];
    $noticeType = mysqli_real_escape_string($con, $_POST['notice_type']);
    $email = $_SESSION['email'];
    $search_fullName = "SELECT * FROM signup WHERE email = '$email' && role = 'teacher'";
    $search_fullName_query = mysqli_query($con, $search_fullName);
    if(!empty($title) && !empty($message) && mysqli_num_rows($search_fullName_query) > 0) {
        $row = mysqli_fetch_assoc($search_fullName_query);
        $teacher = $row['fullName'];
        if(isset($_FILES['my_file'])) {
            $file_name = $_FILES['my_file']['name'];
            $file_type = $_FILES['my_file']['type'];
            $tmp_name = $_FILES['my_file']['tmp_name'];

            $file_explode = explode('.',$file_name);
            $file_ext = end($file_explode);

            $extensions = ['pdf', 'docs', 'docx','PDF'];
            if(in_array($file_ext, $extensions)) {
                $new_file_name = time().$file_name;
                $date = date("j M, Y");
                if(move_uploaded_file($tmp_name,"../uploads/".$new_file_name)) {
                    $insert = "INSERT INTO notice(uniqueId,title,message,date, pdfFile, pageName,teacher)
                    VALUES('$uniqueId','$title','$message','$date','$new_file_name','$noticeType','$teacher')";
                    $insert_query = mysqli_query($con, $insert);
                    if($insert_query) {
                        echo "Notice added successfully";
                    }else {
                        echo "Fail to upload notice ! Try again...";
                    }
                }else {
                    echo "Failed to add file at desired path!!";
                }
            }else {
                echo "Only PDF and Docs file are allowd!!";
            }
        }else {
            echo "File is not set properly!!";
        }
    }else {
        echo "All fields must be filled";
    }

?>