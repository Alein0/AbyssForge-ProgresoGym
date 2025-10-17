import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // fondo negro
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 20,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4682B4', // azul principal
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#4682B4',
    marginTop: 70,
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: '7.5%',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    width: '85%',
    height: 40,
    backgroundColor: '#1C1C1C',
    borderColor: '#4682B4',
    borderWidth: 1,
    borderRadius: 8,
    color: '#fff',
    paddingHorizontal: 10,
  },
  registerBox: {
    width: '85%',
    height: 250,
    backgroundColor: '#1C1C1C',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4682B4',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  placeholderText: {
    color: '#999',
    fontSize: 14,
  },
});

export default styles;
