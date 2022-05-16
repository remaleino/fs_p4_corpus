import re
import sys

# Ainoan funktion tehtävä on löytää ja palauttaa vastaanotettu lemma tekstissä.


def data(aword):
    # Aukaistaan tekstin sisältävän tiedoston
    with open("api/routes/data.txt") as fileD:
        copy = fileD.read()
        copy = copy.replace("\n", " ")
        copy = copy.split()
        sentence = []
        # Hajaoitetaan tekstin rivit lauseiksi
        for word in copy:
            if re.findall('\...$', word):
                sentence.append(word)
                sentence.append(" ")
            elif re.findall('\.$|\!$|\?$|\."$', word):
                sentence.append(word)
                # Palautetaan lause, jossa löytyy lemma
                if aword in sentence:
                    print("".join(sentence))
                sentence = []
            else:
                sentence.append(word)
                sentence.append(" ")


# "sys.argv[1]" on vastaanotettu sana eli lemma
data(sys.argv[1])
