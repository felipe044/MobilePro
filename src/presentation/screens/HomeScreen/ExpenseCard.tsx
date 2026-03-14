/**
 * Card de despesa - Visual moderno com hierarquia clara
 * UI/UX: categoria como badge, destaque no valor, área de toque ampla
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Expense } from '../../../data/models/Expense';

interface ExpenseCardProps {
  expense: Expense;
  onRemove: (id: string) => void;
}

const formatCurrency = (value: number): string =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  });
};

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    Alimentação: '#F59E0B',
    Transporte: '#3B82F6',
    Lazer: '#8B5CF6',
    Saúde: '#10B981',
    Moradia: '#EC4899',
    Outros: '#64748B',
  };
  return colors[category] ?? '#64748B';
};

export function ExpenseCard({ expense, onRemove }: ExpenseCardProps) {
  const categoryColor = getCategoryColor(expense.tp_despesa);

  return (
    <View style={styles.card}>
      <View style={[styles.categoryIndicator, { backgroundColor: categoryColor }]} />
      <View style={styles.content}>
        <Text style={styles.title}>{expense.nm_despesa}</Text>
        <View style={styles.metaRow}>
          <View style={[styles.categoryBadge, { backgroundColor: `${categoryColor}20` }]}>
            <Text style={[styles.categoryText, { color: categoryColor }]}>
              {expense.tp_despesa}
            </Text>
          </View>
          <Text style={styles.date}>{formatDate(expense.data)}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <Text style={styles.value}>{formatCurrency(expense.vlr_despesa)}</Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => onRemove(expense.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.removeText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  categoryIndicator: {
    width: 4,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    letterSpacing: -0.2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
    marginLeft: 8,
  },
  right: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingRight: 14,
    paddingLeft: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    letterSpacing: -0.3,
  },
  removeButton: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
  },
  removeText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
  },
});
