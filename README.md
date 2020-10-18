<h1 align="center">
  Lowes Crawling
</h1>

<h3 align="center">
  Scrapy Application for Crawling in Lowes Store
</h3>


<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/lucasleonardobs/lowes-scrapy">

  <a href="https://www.linkedin.com/in/lucasleonardobs/">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-Lucas%20Leonardo-gree">
  </a>
</p>

<p align="center">
  <a href="#-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
</p>

## 👨🏻‍💻 About the project

<p>
Lowes Scrapy is a crawling script from the Lowes store, initially designed to return information from all refrigerators, but capable of doing this with any appliance. This is done by changing the url on line 9 at ./lowes/spiders/refrigerator.py.

Where you can use the links for the appliances described on this site: [Lowes Appliances](https://www.lowes.com/c/Appliances?int_cmp=Homepage:A2:MajorAppliances:Other:PC_Appliances), such as: [Washers & Dryers](https://www.lowes.com/c/Washers-dryers-Appliances) or [Ranges](https://www.lowes.com/c/Ranges-Appliances).

The data obtained are located in the data folder, in the .csv files
</p>

## 🚀 Technologies

Technologies that I used to develop this crawl

- [Python](https://www.python.org/)
- [Scrapy](https://scrapy.org/)
- [Json](https://docs.python.org/3/library/json.html)

## 💻 Getting started
### Requirements

- [Python3](https://www.python.org/)
- [Anaconda](https://classic.yarnpkg.com/) or [Miniconda](https://docs.conda.io/en/latest/miniconda.html)

> Obs.: I recommend use docker

**Clone the project and access the folder**

```bash
$ git clone https://github.com/lucasleonardobs/lowes-scrapy.git && cd lowes-scrapy
```

**Follow the steps below**

```bash
# Create a virtual environment using conda cli
$ conda env create -f envname.yml

# Activate the virtual env
$ source activate

# Run scrapy
$ scrapy crawl refrigerator -o refrigerators.csv

# Well done, project is started, just wait to finish and consult the refrigerators.csv file!
```


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with 💜 by Lucas Leonardo 👋 [See my linkedin](https://www.linkedin.com/in/lucasleonardobs/)