---
layout: post
title:  "Machine Learning"
date:   2024-09-22 14:48:00 +0800
author: dennis-yew
tag: Life
---


## 机器学习算法类别

| 类型 | 目标 | 算法 |
|---|---|---|
| 监督学习 | 分类、回归 |线性回归、逻辑回归、Lasso 回归（线性回归模型）、决策树、随机森林、支持向量机 (SVM)、k近邻 (KNN)、神经网络、 |
| 无监督学习 | 聚类、降维 | k均值、层次聚类、主成分分析 (PCA)、自编码器 | 
| 强化学习 | 决策、策略优化 | Q-learning、深度强化学习 (DQN) |


1.	监督学习：使用带标签的数据，主要用于分类（如垃圾邮件分类）和回归（预测连续值，如房价预测）。
2.	无监督学习：没有预先定义的标签，常用于聚类（将数据分组，如市场细分）和降维（数据简化，如主成分分析）。
3.	强化学习：通过与环境互动(试错)来学习，设定奖惩机制，常用于决策问题（如机器人控制和游戏AI）。
## 分类与回归算法
｜算法名称｜分类｜回归
｜---｜---｜
｜逻辑回归 (Logistic Regression)	是	否
线性回归 (Linear Regression)	否	是
决策树 (Decision Tree)	是	是
随机森林 (Random Forest)	是	是
支持向量机 (Support Vector Machine)	是	是 (支持向量回归)
K近邻算法 (K-Nearest Neighbors)	是	是
朴素贝叶斯 (Naive Bayes)	是	否
梯度提升树 (Gradient Boosting Trees)	是	是
神经网络 (Neural Networks)	是	是
Lasso 回归 (Lasso Regression)	否	是
岭回归 (Ridge Regression)	否	是
高斯过程 (Gaussian Process)	是	是
XGBoost	是	是
LightGBM	是	是
贝叶斯网络 (Bayesian Networks)	是	否
多层感知器 (Multilayer Perceptron)	是	是

### SVM
支持向量机
支持向量机回归

## 降维
### 主成分分析

Principal Component Analysis，PCA,主成分分析，通常用于对数据进行降维。

> 降维意味着信息的丢失，不过鉴于实际数据本身常常存在的相关性，PCA在降维的同时尽可能防止数据失真。

数据分析通常使用PCA作数据的预处理，以减少数据存储空间和加速计算。

使用PCA，可以将一组可能相关的变量转换为一组线性不相关的变量（主成分）。

> PCA就是将高维的数据投影到一个较低维的空间中，而这个新的空间是由数据方差最大的方向（即主成分）构成的。

### PCA算法的核心

PCA算法通过计算数据的协方差矩阵，并对其进行特征分解（数据方差最大的投影方向），提取出包含数据主要信息的主成分，实现数据的降维。
降维算法的优化目标：将一组N维向量降为K维（K大于0，小于N），其目标是选择K个单位（模为1）正交基，使得原始数据变换到这组基上后，各字段两两间协方差为0（不相关 -> 包含更多的信息），而字段的方差则尽可能大（在正交的约束下，取最大的K个方差 -> g更离散包含更多的信息）。

* **衡量指标**
    *在各保留维度中的方差要最大，因为方差越大数据越散，防止了数据重叠导致信息失真。
* **PCA降维好处**
    * 简化特征的复杂程度，减少训练模型计算量；
* **PCA降维缺点**
    * 离群点的影响较大。


如何找到方差最大的维度：设降维后的数据叫做“白数据”，我们以“白数据”为目标。
手头数据矩阵D' -> 白数据矩阵D，通过拉伸和旋转；
问题转化为求拉伸的比例、旋转的角度；
设拉伸矩阵S、旋转矩阵R，问题转化为求矩阵S和R

## 参考
文稿：http://blog.codinglabs.org/articles/pca-tutorial.html
视频讲解：https://www.bilibili.com/video/BV1E5411E71z/?spm_id_from=333.337.search-card.all.click&vd_source=a4da8462c3ff1824fa05dc10a18b25d8