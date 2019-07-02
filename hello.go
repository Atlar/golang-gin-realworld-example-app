package main

import (
	"net/http"
	"os"

	"gopkg.in/gin-gonic/gin.v1"

	"github.com/Atlar/golang-gin-realworld-example-app/articles"
	"github.com/Atlar/golang-gin-realworld-example-app/users"
	"github.com/jinzhu/gorm"

	//My
	"github.com/Atlar/golang-gin-realworld-example-app/database_agent"
)

func Migrate(db *gorm.DB) {
	users.AutoMigrate()
	db.AutoMigrate(&articles.ArticleModel{})
	db.AutoMigrate(&articles.TagModel{})
	db.AutoMigrate(&articles.FavoriteModel{})
	db.AutoMigrate(&articles.ArticleUserModel{})
	db.AutoMigrate(&articles.CommentModel{})
}

func main() {

	/////////////
	Port := os.Getenv("PORT")
	var db database_agent.MongoAgent

	database_agent.Init(&db)
	//db := common.Init()
	database_agent.TestDB(&db)

	//Migrate(db)
	defer db.Close()

	r := gin.Default()

	//set html
	r.LoadHTMLGlob("public/react_frontend/public*.tmpl.html")
	r.Static("public/react_frontend/static", "static")

	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "public/react_frontend/public/index.tmpl.html", nil)
	})
	//////////////

	//setup API

	v1 := r.Group("/api")
	users.UsersRegister(v1.Group("/users"))
	v1.Use(users.AuthMiddleware(false))
	articles.ArticlesAnonymousRegister(v1.Group("/articles"))
	articles.TagsAnonymousRegister(v1.Group("/tags"))

	v1.Use(users.AuthMiddleware(true))
	users.UserRegister(v1.Group("/user"))
	users.ProfileRegister(v1.Group("/profiles"))

	articles.ArticlesRegister(v1.Group("/articles"))

	testAuth := r.Group("/api/ping")

	testAuth.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	///////////////

	/*
		// test 1 to 1
		tx1 := db.Begin()
		userA := users.UserModel{
			Username: "AAAAAAAAAAAAAAAA",
			Email:    "aaaa@g.cn",
			Bio:      "hehddeda",
			Image:    nil,
		}
		tx1.Save(&userA)
		tx1.Commit()
		fmt.Println(userA)
	*/

	//db.Save(&ArticleUserModel{
	//    UserModelID:userA.ID,
	//})
	//var userAA ArticleUserModel
	//db.Where(&ArticleUserModel{
	//    UserModelID:userA.ID,
	//}).First(&userAA)
	//fmt.Println(userAA)

	r.Run(Port) // listen and serve on 0.0.0.0:8080
}
