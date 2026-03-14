/**
 * Tela Resumo - Total e gastos por categoria
 * UI/UX: Mesmos padrões da Home (cards, sombras, cores, hierarquia)
 */
import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Container } from '../../../core/Container';
import type { ExpenseViewModel } from '../../viewmodels/ExpenseViewModel';
import { Expense } from '../../../data/models/Expense';
import styles, { getCategoryColorFn } from './SummaryScreen.styles';

const formatCurrency = (value: number): string =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export function SummaryScreen() {
  const viewModel = Container.getInstance().resolve<ExpenseViewModel>('ExpenseViewModel');
  const [total, setTotal] = useState(0);
  const [byCategory, setByCategory] = useState<Record<string, Expense[]>>({});

  useFocusEffect(
    useCallback(() => {
      setTotal(viewModel.getTotal());
      setByCategory(viewModel.getExpensesByCategory());
    }, [viewModel])
  );

  const categories = Object.entries(byCategory);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={categories.length === 0 ? { flexGrow: 1 } : undefined}
    >
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total gasto</Text>
        <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
      </View>

      <Text style={styles.sectionTitle}>Gastos por categoria</Text>

      {categories.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Text style={styles.emptyIconText}>📊</Text>
          </View>
          <Text style={styles.emptyText}>
            Nenhum gasto para exibir no resumo
          </Text>
          <Text style={styles.emptyHint}>
            Adicione gastos na tela inicial para ver a análise por categoria
          </Text>
        </View>
      ) : (
        categories.map(([category, expenses]) => {
          const catTotal = expenses.reduce((s, e) => s + e.vlr_despesa, 0);
          const categoryColor = getCategoryColorFn(category);
          const itemLabel = expenses.length === 1 ? '1 item' : `${expenses.length} itens`;
          return (
            <View key={category} style={styles.categoryCard}>
              <View
                style={[
                  styles.categoryIndicator,
                  { backgroundColor: categoryColor },
                ]}
              />
              <View style={styles.categoryContent}>
                <Text style={styles.categoryName}>{category}</Text>
                <Text style={styles.categoryMeta}>
                  {formatCurrency(catTotal)} • {itemLabel}
                </Text>
              </View>
            </View>
          );
        })
      )}
    </ScrollView>
  );
}
