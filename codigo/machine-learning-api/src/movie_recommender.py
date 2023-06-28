# Core
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
# from matplotlib.pyplot.bar_label
import seaborn as sns
#import optuna
from scipy import stats
import glob
import random
import datetime
import plotly.express as px
import plotly.graph_objects as go
import plotly.io as pio

import os
import pickle
# from  datasist.structdata import detect_outliers
from tqdm import tqdm
# Core
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

sns.set(rc={'figure.figsize': [7, 7]}, font_scale=1.2)
from datetime import date, timedelta
from mpl_toolkits.mplot3d import Axes3D
from mpl_toolkits.mplot3d import axes3d
import sklearn
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
# Pre Processing
from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import MinMaxScaler
# Regressors
from sklearn.linear_model import Ridge
from sklearn.linear_model import Lasso
from sklearn.neighbors import KNeighborsRegressor
from sklearn.ensemble import RandomForestRegressor, AdaBoostRegressor
from sklearn.svm import SVR
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LogisticRegression
# Error Metrics
from sklearn.metrics import r2_score  #r2 square
from sklearn.metrics import mean_absolute_error
from sklearn.metrics import mean_squared_error
from sklearn.metrics import ConfusionMatrixDisplay, classification_report
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

#classefication
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn import tree
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import SGDClassifier  #stacstic gradient descent clasifeier
import graphviz
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestClassifier
#crossvalidation
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import LeaveOneOut
from sklearn.metrics import ConfusionMatrixDisplay
#clustring
from sklearn.cluster import KMeans
from sklearn.cluster import AgglomerativeClustering
#hyper parameter tunning
from sklearn.model_selection import GridSearchCV
#pca
from sklearn.decomposition import PCA
#clustring
from sklearn.cluster import KMeans
from warnings import filterwarnings

filterwarnings("ignore")

seed = 42
np.random.seed = seed


#convert data frame to slower case
def lowerCase(x):
    return x.lower()


#check duplicate data
def check_duplicate(df):
    if df.duplicated().all():
        return 'There are duplicate Data in Data Frame Nedded To be  removed . '
    else:
        return 'Data Is clean ,No Duplicate Data Found .'


def get_item_id(x):
    itemname = df[df['title'] == x]
    return itemname['item_id']


def calc_day_of_birth(day_num):
    today = date.today()
    birthDay = (today + timedelta(days=day_num)).strftime('%Y-%m-%d')
    return birthDay


def calc_day_of_employed(day_num):
    today = date.today()
    employedDay = (today + timedelta(days=day_num)).strftime('%Y-%m-%d')
    result = 0
    if employedDay > date.today().strftime('%Y-%m-%d'):
        result = 0
    else:
        result = employedDay
    return result


def calculate_age(born):
    born = datetime.datetime.strptime(born, '%Y-%m-%d')
    today = date.today()
    return today.year - born.year - (
        (today.month, today.day) < (born.month, born.day))


def get_appartment(x):
    if x == 'House / apartment':
        x = x.split(' /')[0]
    return x


def get_ducational_type(x):
    if x == 'Secondary / secondary special':
        x = x.split(' /')[0]
    return x


def get_label_for_data(x):
    target = ''
    if x in (2, 3, 4, 5):
        target = 'YES'  #risky
    else:
        target = 'NO'  #not risky

    return target


    #draw distplot for all numeric columns just pass numerical column
def all_distplot(numCol):
    plt.figure(1, figsize=(20, 6))
    n = 0
    for x in numCol:
        n += 1
        plt.subplot(1, len(numCol), n)
        plt.subplots_adjust(hspace=0.5, wspace=0.5)
        sns.distplot(df[x], bins=20)
        plt.title('Distplot of {}'.format(x))
    plt.show()


def box_plot(df):
    i = 1
    plt.figure(figsize=(20, 50))
    for col in df.columns:
        plt.subplot(round(len(df.columns) / 3), 3, i)
        sns.boxplot(x=df[col], data=df, width=0.5, fliersize=3, linewidth=1)
        i += 1


def numerical_plotting(df, col, title, symb):
    fig, ax = plt.subplots(2,
                           1,
                           sharex=True,
                           figsize=(8, 5),
                           gridspec_kw={"height_ratios": (.2, .8)})
    ax[0].set_title(title, fontsize=18)
    sns.boxplot(x=col, data=df, ax=ax[0])
    ax[0].set(yticks=[])
    sns.distplot(df[col], kde=True)
    plt.xticks(rotation=45)
    ax[1].set_xlabel(col, fontsize=16)
    plt.axvline(df[col].mean(),
                color='darkgreen',
                linewidth=2.2,
                label='mean=' + str(np.round(df[col].mean(), 1)) + symb)
    plt.axvline(df[col].median(),
                color='red',
                linewidth=2.2,
                label='median=' + str(np.round(df[col].median(), 1)) + symb)
    plt.axvline(df[col].mode()[0],
                color='purple',
                linewidth=2.2,
                label='mode=' + str(df[col].mode()[0]) + symb)
    plt.legend(bbox_to_anchor=(1, 1.03),
               ncol=1,
               fontsize=17,
               fancybox=True,
               shadow=True,
               frameon=True)
    plt.tight_layout()
    plt.show()


def categorical_plotting(df, col, title):
    fig, ax = plt.subplots(figsize=(10, 5))
    ax = sns.countplot(x=col,
                       data=df,
                       palette='flare',
                       order=df[col].value_counts().index)
    ax.set_xticklabels(ax.get_xticklabels(), rotation=45)
    ax.bar_label(ax.containers[0])
    plt.title(title)
    plt.show()


def plot_feature_importance(x, model, Model_name):
    plt.figure(figsize=(15, 20))
    columns_list = x.columns
    model.feature_names = columns_list
    plt.barh(model.feature_names, sorted(model.coef_))
    plt.xticks(rotation=45)
    plt.title('Feature Importance' + Model_name)
    plt.xlabel('Feature Importance (%)')
    plt.show()


def plot_feature_importance_2(x, model, Model_name):
    plt.figure(figsize=(15, 20))
    columns_list = x.columns
    model.feature_names = columns_list
    plt.barh(model.feature_names, sorted(model.feature_importances_))
    plt.xticks(rotation=45)
    plt.title('Feature Importance' + Model_name)
    plt.xlabel('Feature Importance (%)')
    plt.show()


def lr_plot(df, col_x, col_y, leg):
    slope, intercept, r_value, p_value, std_err = stats.linregress(
        df[col_x], df[col_y])
    sns.regplot(
        x=col_x,
        y=col_y,
        data=df,
        color='#0d98ba',
        line_kws={'label': "y={0:.1f}x+{1:.1f}".format(slope, intercept)})
    plt.legend(loc=leg,
               ncol=1,
               fontsize=15,
               fancybox=True,
               shadow=True,
               frameon=True)
    plt.title(col_y + ' VS ' + col_x)
    plt.show()

    return slope, intercept


def average_plotting(df, col, output, number, title):
    data_list = df[col].value_counts().index[:number].tolist()
    plt.figure(figsize=(15, 5))
    ax = sns.barplot(x=col,
                     y=output,
                     data=df[df[col].isin(data_list)],
                     order=data_list,
                     palette='flare',
                     ci=False,
                     edgecolor="black")
    plt.xticks(rotation=45)
    ax.bar_label(ax.containers[0])
    plt.title(title)
    plt.show()


def draw_unique_value(df, title):
    plt.figure(figsize=(10, 5))
    plt.title(title)
    unique_counts = df.nunique().to_dict()
    ax = sns.barplot(list(unique_counts.keys()),
                     list(unique_counts.values()),
                     palette='flare')
    ax.bar_label(ax.containers[0])
    plt.plot()


titles = pd.read_csv('./src/model/movies.csv')
ratings = pd.read_csv('./src/model/ratings.csv')

df = pd.merge(ratings, titles, on='movieId')
df = df.drop(['timestamp'], axis=1)

numCol = [col for col in df.columns if df[col].dtype != "O"]

catColumn = [col for col in df.columns if df[col].dtype == "O"]

check_duplicate(df)

df.isnull().sum().sort_values(ascending=False)

cols = df.columns

movies_rating_counts = df.groupby('title')['rating'].count().reset_index(
).rename(columns={'rating': 'count'})

final = pd.merge(df, movies_rating_counts, on='title', how='left')
final[final['count'] >= 69]

threshould = 69
final_df_rating = final.query('count>=@threshould')

Movies_pav = final_df_rating.pivot_table(index='userId',
                                         values='rating',
                                         columns='title')

similarity = Movies_pav.corrwith(Movies_pav['Toy Story (1995)'])

corrlatedFilms = similarity.sort_values(ascending=False).reset_index().rename(
    columns={0: 'corrolation'})

rat = final_df_rating.groupby('title').agg({
    'title': 'count',
    'rating': 'mean'
}).rename(columns={
    'title': 'count',
    'rating': 'rating'
}).reset_index()

recomend = pd.merge(rat, corrlatedFilms, on='title')
recomend.sort_values(by='corrolation', ascending=False)[1:11]
pivote_table = final_df_rating.pivot_table(index='title',
                                           values='rating',
                                           columns='userId').fillna(0)

from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors

matrix = csr_matrix(pivote_table.values)
model = NearestNeighbors(metric='cosine', algorithm='brute')
model.fit(matrix)

query_index = np.random.choice(pivote_table.shape[0])

import sys, json


def get_recommendations(movieId, amount=10):
    distance, indices = model.kneighbors(
        pivote_table.iloc[movieId, :].values.reshape(1, -1),
        n_neighbors=amount + 1)
    recommendedMovies = []

    for i in range(0, len(distance.flatten())):
        recommendedMovies.append(pivote_table.index[indices.flatten()[i]])

    movie = pivote_table.index[movieId]

    return {"recommendations": recommendedMovies[1:], "based_on": movie}


if __name__ == "__main__":
    movie_id = int(sys.argv[1])
    amount = int(sys.argv[2])

    recommendations = get_recommendations(movie_id, amount)

    print(json.dumps(recommendations))
