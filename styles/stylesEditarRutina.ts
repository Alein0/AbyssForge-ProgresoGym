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
  section: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  label: {
    color: '#4682B4',
    fontSize: 15,
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#1C1C1C',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#4682B4',
  },
  exerciseCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#4682B4',
  },
  exerciseText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  addSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 80,
  },
  inputAdd: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45,
    fontSize: 16,
    color: '#000',
  },
  addButton: {
    marginLeft: 10,
  },
});

export default styles;
