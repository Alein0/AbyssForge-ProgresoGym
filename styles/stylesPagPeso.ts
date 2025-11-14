import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d1d',
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 20,
    paddingTop: 50,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffffff',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#4682B4',
    paddingTop: 90,
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
  marginTop: 15,
  paddingVertical: 0,             // Quitar padding, todo lo hace recordCard
  paddingHorizontal: 0,
  overflow: 'hidden',
},
  placeholderText: {
    color: '#999',
    fontSize: 14,
  },
  // Estilos organizados para los registros
recordCard: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: 'transparent',  // Transparente para que el registerBox haga de borde
  borderBottomWidth: 1,
  borderBottomColor: '#333',       // Separador discreto
  paddingVertical: 10,
  paddingHorizontal: 4,
  width: '100%',
},
 recordPeso: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
  minWidth: 80,
  textAlign: 'left',
},
 recordFecha: {
  color: '#aaa',
  fontSize: 14,
  marginLeft: 14,
  flex: 1,
  textAlign: 'left',
},
 deleteButton: {
  backgroundColor: 'transparent',
  borderRadius: 16,
  paddingHorizontal: 8,
  paddingVertical: 2,
  marginLeft: 16,
},
  deleteText: {
  color: '#ff5555',
  fontWeight: 'bold',
  fontSize: 20,
},
});

export default styles;
