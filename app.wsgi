import os
import site
p = os.path.dirname(__file__)
site.addsitedir(p)
os.chdir(p)

from app import application
