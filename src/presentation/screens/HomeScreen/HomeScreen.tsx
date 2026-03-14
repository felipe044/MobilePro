/**
 * Tela Home - Lista de gastos e valor total
 * MVVM: View consome o ViewModel via hook
 */
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Container } from '../../../core/Container';
import { Expense } from '../../../data/models/Expense';
import { ExpenseCard } from './ExpenseCard';
import styles, { colors } from './HomeScreen.styles';

interface HomeScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

export function HomeScreen({ navigation }: HomeScreenProps) {
  const viewModel = Container.getInstance().resolve<import('../../viewmodels/ExpenseViewModel').ExpenseViewModel>('ExpenseViewModel');

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [total, setTotal] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(() => {
    setExpenses(viewModel.getExpenses());
    setTotal(viewModel.getTotal());
  }, [viewModel]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
    setRefreshing(false);
  }, [loadData]);

  const handleRemove = useCallback(
    (id: string) => {
      Alert.alert('Excluir', 'Deseja excluir este gasto?', [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            viewModel.removeExpense(id);
            loadData();
          },
        },
      ]);
    },
    [viewModel, loadData]
  );

  const formatTotal = (value: number) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <View style={styles.container}>
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total gasto</Text>
        <Text style={styles.totalValue}>{formatTotal(total)}</Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.listHeader}>Gastos recentes</Text>
        {expenses.length > 0 && (
          <Text style={styles.expenseCount}>
            {expenses.length} {expenses.length === 1 ? 'item' : 'itens'}
          </Text>
        )}
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseCard expense={item} onRemove={handleRemove} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>📋</Text>
            </View>
            <Text style={styles.emptyText}>
              Nenhum gasto cadastrado ainda
            </Text>
            <Text style={styles.emptyHint}>
              Toque no botão + para registrar seu primeiro gasto
            </Text>
          </View>
        }
        contentContainerStyle={
          expenses.length === 0 ? { flexGrow: 1 } : { paddingBottom: 120 }
        }
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      />

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.resumoButton}
          onPress={() => navigation.navigate('Summary')}
          activeOpacity={0.85}
        >
          <Text style={styles.resumoButtonText}>📊 Resumo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AddExpense')}
          activeOpacity={0.85}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
