import re
import sys


def data(aword):
    with open("api/routes/data.txt") as fileD:
        copy = fileD.read()
        copy = copy.replace("\n", " ")
        copy = copy.split()
        sentence = []
        for word in copy:
            if re.findall('\...$', word):
                sentence.append(word)
                sentence.append(" ")
            elif re.findall('\.$|\!$|\?$|\."$', word):
                sentence.append(word)
                if aword in sentence:
                    print("".join(sentence))
                sentence = []
            else:
                sentence.append(word)
                sentence.append(" ")


data(sys.argv[1])
