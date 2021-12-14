package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"

	"gopkg.in/yaml.v2"

	"github.com/gin-gonic/gin"
)

type ApiModel struct {
	From string `yaml:"from"`
	To   string `yaml:"to"`
}

type MockModel struct {
	Apis []ApiModel `yaml:"api"`
}

var STATIC_PATH = "/home/ph/Git/spa/static/dist/"
var INDEX_PATH = "/home/ph/Git/spa/static/dist/index.html"
var MOCK_PATH = "/home/ph/Git/spa/static/mock.yml"

func backFile(filename string) string {
	var f, err = os.Stat(STATIC_PATH + filename)
	if err != nil || f.IsDir() == true {
		return INDEX_PATH
	}
	fmt.Println(STATIC_PATH + filename)
	return STATIC_PATH + filename
}

func parserYaml() []ApiModel{
	var f, err = os.Open(MOCK_PATH)
	if err != nil {
		panic("Please have a mock.yml file in /static.")
	}
	ctx, err := io.ReadAll(f)
	var mock MockModel
	err = yaml.Unmarshal(ctx, &mock)
	if err != nil {
		panic("Faild to unmarshal mock.yml, please check your code format")
	}
  return mock.Apis
}

func startServer(apis []ApiModel) {
	var r = gin.Default()
	r.Any("/*file", func(c *gin.Context) {
		var filename = c.Param("file")
		for _, api := range apis {
			if filename == api.From {
				var reader = strings.NewReader("")
				var _, err = http.NewRequest("GET", api.To, reader)
				if err != nil {
					c.JSON(404, gin.H{})
				}
				c.JSON(200, gin.H{})
			}
		}
		c.File(backFile(filename[1:]))
	})
	r.Run(":8080")
}

func main() {
	var apis = parserYaml()
	startServer(apis)
}
