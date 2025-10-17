import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#4682B4',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  mainCard: {
    backgroundColor: '#121212',
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 15,
    paddingVertical: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4682B4',
  },
  mainCardText: {
    color: '#4682B4',
    fontSize: 20,
    fontWeight: '700',
  },
  exerciseCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    marginHorizontal: 20,
    marginVertical: 6,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderLeftWidth: 3,
    borderLeftColor: '#4682B4',
  },
  exerciseText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default styles;
