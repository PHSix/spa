package main

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

var STATIC_PATH = "/home/ph/program/spa/static/dist/"
var INDEX_PATH = "/home/ph/program/spa/static/dist/index.html"

func backFile(filename string) string {
	var f, err = os.Stat(STATIC_PATH + filename)
	if err != nil || f.IsDir() == true {
		return INDEX_PATH
	}
	fmt.Println(STATIC_PATH + filename)
	return STATIC_PATH + filename
}

func main() {
	var r = gin.Default()
	r.Any("/*file", func(c *gin.Context) {
		var filename = c.Param("file")
		if filename == "/api" {
			var reader = strings.NewReader("")
			var _, err = http.NewRequest("GET", "https://baid.com", reader)
			if err != nil {
				c.JSON(404, gin.H{})
			}
			c.JSON(200, gin.H{})
		}
		c.File(backFile(filename[1:]))
	})
	r.Run(":8080")
}
