const gulp = require("gulp");


//监听任务
gulp.task("watchall",async()=>{
    gulp.watch("*.html",async () =>{
        gulp.src("*.html")
        .pipe(gulp.dest("D:\\phpStudy\\WWW\\mypcb"));
    });

    
})