# import numpy as np  # linear algebra
# import pandas as pd  # data processing, CSV file I/O (e.g. pd.read_csv)

# # Input data files are available in the read-only "../input/" directory
# # For example, running this (by clicking run or pressing Shift+Enter) will list all files under the input directory

# import os
# for dirname, _, filenames in os.walk('/model'):
#     for filename in filenames:
#         print(os.path.join(dirname, filename))

# # You can write up to 20GB to the current directory (/kaggle/working/) that gets preserved as output when you create a version using "Save & Run All"
# # You can also write temporary files to /kaggle/temp/, but they won't be saved outside of the current session

# # Defina o tamanho do dataset desejado
# tamanho_dataset = 1000

# # Exemplo de colunas de um dataset de publicações
# post_id = np.arange(1, tamanho_dataset + 1)
# title = np.random.choice(['Post 1', 'Post 2', 'Post 3'], tamanho_dataset)
# genre = np.random.choice(
#     ['Python', 'Front-end', 'Finances', 'Back-end', 'Design'], tamanho_dataset)

# # Crie um dicionário com os dados
# dados = {'postId': post_id, 'title': title, 'genres': genre}

# # Crie um DataFrame usando o dicionário de dados
# df = pd.DataFrame(dados)

# # Salve o DataFrame em um arquivo CSV
# df.to_csv('./src/model/dataset_post.csv', index=False)
# """### Passo 1 : Importar os arquivos necessários """

# movie = pd.read_csv("./src/model/movies.csv")

# post = pd.read_csv("./src/model/dataset_post.csv")
# """### Passo 2 : Pré-processamento e limpeza de dados"""

# #Verifica se há títulos duplicados
# movie["title"].unique()

# #Cria uma nova coluna com o ano que está no título dos filmes
# movie["Year"] = movie.title.str.extract("(\(\d\d\d\d\))", expand=True)

# #Remover '()' do ano
# movie["Year"] = movie.title.str.extract("(\d\d\d\d)", expand=True)

# #Removendo qualquer ano de lançamento presente nos títulos dos filmes, substituindo-os por espaços em branco
# movie["title"] = movie.title.str.replace("(\(\d\d\d\d\))", "")

# #Removendo espaços extras no ínicio e fim do título
# movie["title"] = movie["title"].apply(lambda x: x.strip())
# post["title"] = post["title"].apply(lambda x: x.strip())

# #Transformando todos os elementos da coluna 'genres' em letras minúsculas
# movie["genres"] = movie["genres"].apply(lambda x: x.lower())
# post["genres"] = post["genres"].apply(lambda x: x.lower())
# """Extração de dados de outra tabela"""

# #Importando o arquivo 'tags.csv'
# tag = pd.read_csv("./src/model/tags.csv")

# # Defina o tamanho do dataset desejado
# tamanho_dataset = 1000

# # Exemplo de colunas de um dataset de publicações
# user_id = np.random.randint(100)
# post_id = np.arange(1, tamanho_dataset + 1)
# tag = np.random.choice(['Post 1', 'Post 2', 'Post 3'], tamanho_dataset)
# timestamp = np.random.choice(
#     ['Python', 'Front-end', 'Finances', 'Back-end', 'Design'], tamanho_dataset)

# # Crie um dicionário com os dados
# dados = {'postId': post_id, 'title': title, 'genres': genre}

# # Crie um DataFrame usando o dicionário de dados
# df = pd.DataFrame(dados)

# # Salve o DataFrame em um arquivo CSV
# df.to_csv('./src/model/dataset_post.csv', index=False)

# """Faz merge das colunas das tabelas"""

# #Merge arquivos 'movie' e 'tag'
# df = pd.merge(movie, tag, on="movieId", how="left")

# #Criando metadata ao adicionar gênero e tags
# df.fillna("", inplace=True)  #preenche os valores ausentes (NaN)
# df = pd.DataFrame(
#     df.groupby("movieId")["tag"].apply(lambda x: "%s" % " ".join(x))
# )  # Essa função junta os valores da coluna "tag" separados por espaço em branco.

# #merge movie and df dataset
# new_df = pd.merge(movie, df, on="movieId", how="left")
# new_df["metadata"] = new_df[["tag", "genres"]].apply(lambda x: " ".join(x),
#                                                      axis=1)

# #Armazena as colunas 'movieId' 'title' 'metadata' 'year' no novo dataser (new_df)
# new_df = new_df[["movieId", "title", "metadata", "Year"]]

# # split |  from metadata
# new_df["metadata"] = new_df.metadata.str.split("|")

# #Remove todos espaços extra da coluna de metadata
# new_df['metadata'] = new_df['metadata'].apply(
#     lambda x: [i.replace(" ", "") for i in x])

# # join metadata spaces
# new_df['metadata'] = new_df['metadata'].apply(lambda x: " ".join(x))

# #Encontra a posição do index
# x = new_df[new_df["title"] == "Jumanji"].index
# """### Passo 3 : Conversão do DataFrame (nem_df) em uma matriz esparsa (sparse matrix)"""

# #Criar um vetor utilizando a biblioteca TfidfVectorizer.
# from sklearn.feature_extraction.text import TfidfVectorizer

# tfid = TfidfVectorizer(
#     stop_words='english'
# )  #remover palavras comuns em inglês que não são relevantes para a análise.
# new_df['metadata'] = new_df['metadata'].fillna('')

# tfv_matrix = tfid.fit_transform(new_df['metadata'])

# # import linear_kernel from sklearn
# from sklearn.metrics.pairwise import linear_kernel
# ###Calcular o kernel sigmoide.
# sig = linear_kernel(tfv_matrix, tfv_matrix)

# #Guarda index do title
# indices = pd.Series(new_df.index, index=new_df["title"])
# """### Passo 4 : Criando a função de recomendação de filme"""

# def recomend_movie(title, cosine_sin=sig):
#     idx = indices[title]
#     sim_scores = enumerate(cosine_sin[idx])
#     sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
#     #Quantos filmes irá recomendar
#     sim_scores = sim_scores[1:10]
#     movies_indices = [i[0] for i in sim_scores]
#     movie_rec = new_df['title'].iloc[movies_indices].reset_index()
#     print(movie_rec)

# """### Passo 5 : Recomendação ⭐"""

# recomend_movie("Toy Story")

# recomend_movie("Thumbelina")

# recomend_movie("Grumpier Old Men")

import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

# Importing the movie dataset
movie = pd.read_csv("./src/model/movies.csv")

# Importing the tags dataset
tags = pd.read_csv("./src/model/tags.csv")

# Merge files 'movie' and 'tags'
df = pd.merge(movie, tags, on="movieId", how="left")

# Creating metadata by adding genre and tags
df.fillna("", inplace=True)
df = pd.DataFrame(df.groupby("movieId")["tag"].apply(lambda x: " ".join(x)))

# Merge 'movie' and 'df' dataset
new_df = pd.merge(movie, df, on="movieId", how="left")
new_df["metadata"] = new_df[["tag", "genres"]].apply(lambda x: " ".join(x),
                                                     axis=1)

# Store the columns 'movieId', 'title', 'metadata' in the new dataset (new_df)
new_df = new_df[["movieId", "title", "metadata"]]
new_df["Year"] = new_df["title"].str.extract("(\(\d\d\d\d\))", expand=True)
new_df["Year"] = new_df["Year"].str.extract("(\d\d\d\d)", expand=True)
new_df["title"] = new_df["title"].str.replace("(\(\d\d\d\d\))", "")
new_df["title"] = new_df["title"].str.strip()
new_df["metadata"] = new_df["metadata"].str.lower()

# Create a series with movie titles as indices for easy lookup
indices = pd.Series(new_df.index, index=new_df["title"])

# Preprocess metadata column
new_df["metadata"] = new_df["metadata"].str.split("|")
new_df['metadata'] = new_df['metadata'].apply(
    lambda x: [i.replace(" ", "") for i in x])
new_df['metadata'] = new_df['metadata'].apply(lambda x: " ".join(x))

# Create tf-idf matrix
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(new_df['metadata'])

# Calculate cosine similarity
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

import difflib


def recommend_movie(movie_title, amount, cosine_sim=cosine_sim):
    similar_titles = difflib.get_close_matches(movie_title,
                                               new_df['title'],
                                               n=1,
                                               cutoff=0.6)
    if not similar_titles:
        return {"error": f"No similar movie titles found for '{movie_title}'."}

    similar_title = similar_titles[0]
    idx = new_df[new_df['title'] == similar_title].index[0]

    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:amount + 1]
    movie_indices = [i[0] for i in sim_scores]
    recommended_movies = new_df['title'].iloc[movie_indices].tolist()

    result = {
        "based_on": similar_title,
        "amount": amount,
        "movies": recommended_movies
    }
    return result


import json

# # Example usage
# params = {"amount": 15, "movie_title": "Jumanji"}
# recommended_movies = recommend_movie(params["movie_title"], params["amount"])

# print(
#     # json.dumps(
#     recommended_movies
#     # )
# )

import sys

if __name__ == "__main__":
    movie_title = str(sys.argv[1])
    amount = int(sys.argv[2])

    recommended_movies = recommend_movie(movie_title, amount)

    print(json.dumps(recommended_movies))