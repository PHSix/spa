package main

import (
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
)

var STATIC_PATH = "/home/ph/program/spa/static/"
var INDEX_PATH = "/home/ph/program/spa/static/index.html"

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
		c.File(backFile(filename[1:]))
	})
	r.Run(":8080")
}
